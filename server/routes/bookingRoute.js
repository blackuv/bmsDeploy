const router = require("express").Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const authMiddleware = require("../middlewares/authMiddleware");

const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
const { populate } = require("../models/theatreModel");
const EmailHelper = require("../utils/emailHelper");

router.post("/make-payment", authMiddleware, async (req, res) =>{
    try {
        const {token, amount} = req.body;
        const customer = await stripe.customers.create({
            email:token.email,
            source:token.id
        })
        const paymentIntent = await stripe.paymentIntents.create({
            amount:amount,
            currency:"usd",
            customer:customer.id,
            payment_method_types:["card"],
            receipt_email:token.email,
            description:"Token has been assigned to the movie",
            confirm:true,
        });
        const transactionId = paymentIntent.id;
        res.send({
            success:true,
            message:"Payment successfull",
            data:transactionId,
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})

router.post("/book-show", authMiddleware, async(req, res)=>{
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        const show = await Show.findById(req.body.show).populate("movie");
        const updatedBookedSeates = [...show.bookedSeats, ...req.body.seats];
        await Show.findByIdAndUpdate(req.body.show, {bookedSeats:updatedBookedSeates});
        
        //adding more details to the booking object
        const populatedBooking = await Booking.findById(newBooking._id)
        .populate("user")
        .populate("show")
        .populate({
            path:"show",
            populate:{
                path:"movie",
                model:"movies"
            }
        })
        .populate({
            path:"show",
            populate:{
                path:"theatre",
                model:"theatres"
            }
        })
        console.log("populatedBookings ", populatedBooking);

        //call the email helper
        await EmailHelper("ticketTemplate.html", populatedBooking.user.email, {
            name: populatedBooking.user.name,
            movie: populatedBooking.show.movie.title,
            theatre: populatedBooking.show.theatre.name,
            date: populatedBooking.show.date,
            time: populatedBooking.show.time,
            seats: populatedBooking.seats.join(", "),
            amount: populatedBooking.seats.length * populatedBooking.show.ticketPrice,
            transactionId: populatedBooking.transactionId,
        })

        res.send({success:true, message:"Booking Successfull"});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})

router.get("/get-all-bookings/:userId", authMiddleware, async(req, res) =>{
    try {
        const bookings = await Booking.find({user:req.params.userId})
        .populate("user")
        .populate("show")
        .populate({
            path:"show",
            populate:{
                path:"movie",
                model:"movies"
            }
        })
        .populate({
            path:"show",
            populate:{
                path:"theatre",
                model:"theatres",
            }
        });
        res.send({
            success:true,
            data:bookings,
            message: "Booking fetched successfully",
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})

module.exports = router;
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors({
  origin:"*",
  methods:["GET","POST","PUT","DELETE","PATCH"],
  allowedHeaders:["Content-Type", "Authorization"],
}))
app.use(express.json());
const clientBuildPath = path.join(__dirname, "../client/build");
console.log(clientBuildPath);
app.use(express.static(clientBuildPath))
app.get("*", (req, res)=>{
  res.sendFile(path.join(clientBuildPath, "index.html"));
})
require("dotenv").config(); // load environment variables

const connectDB = require("./config/db"); // import DB connection
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoute");
const theatreRouter = require("./routes/theatreRoute"); 
const showRouter = require("./routes/showRoutes");
const bookingRouter = require("./routes/bookingRoute");


// console.log("server", process.env);
connectDB(); // connect to DB

//Routes
app.use("/api/users", userRouter)
app.use("/api/movies", movieRouter)
app.use("/api/theatres", theatreRouter)
app.use("/api/shows", showRouter)
app.use("/api/bookings", bookingRouter);

app.listen(8082, () => {
  console.log("Server is running at port 8082");
});
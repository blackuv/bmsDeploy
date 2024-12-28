const Movie = require("../models/movieModel");

const addMovie = async (req, res)=>{
    try {
        const newMovie = new Movie(req.body)
        await newMovie.save();
        res.send({
            success:true,
            message: "Movie added successfully"
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message: error.message 
        });
    }
}

const getAllMovies = async (req, res) =>{
    try {
        const allMovies = await Movie.find();
        //if you want to find by genre
        //Movie.find({genre: req.query.genre})
        res.send({
            success:true,
            message: "All movies fetched successfully",
            data: allMovies
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message: error.message 
        });
    }
}

const updateMovie = async (req, res) =>{
    try {
        const movie = await Movie.findByIdAndUpdate(req.body.movieId, req.body, {new:true})
        if(!movie){
            return res.status(404).send({
                success:false,
                message: "Movie not found" 
            });
        }
        res.send({
            success:true,
            message: "Movie updated successfully"
            })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message: error.message 
        });
    }
}

const deleteMovie = async (req, res) =>{
    try {
        const movie = await Movie.findByIdAndDelete(req.body.movieId)
        if(!movie){
            return res.status(404).send({
                success:false,
                message: "Movie not found" 
            });
        }
        res.send({
            success:true,
            message: "Movie Deleted successfully"
            })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message: error.message 
        });
    }
}

const getMovieById = async (req, res) =>{
    try {
        const movie = await Movie.findById(req.params.id);
        if(!movie){
            return res.status(400).send({
                success:false,
                message: "Movie not Found" 
            });
        }
        res.send({
            success:true,
            message: "Movie fetched successfully",
            data: movie
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message: error.message 
        });
    }
}

module.exports = { addMovie, getAllMovies, updateMovie, deleteMovie, getMovieById };
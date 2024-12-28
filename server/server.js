const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

// Middleware for CORS
app.use(cors({
  origin: "https://vishnubookmyshow.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middleware for JSON parsing
app.use(express.json());

// Import environment variables
require("dotenv").config();

// Import DB connection and routes
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoute");
const theatreRouter = require("./routes/theatreRoute");
const showRouter = require("./routes/showRoutes");
const bookingRouter = require("./routes/bookingRoute");

// Connect to the database
connectDB();

// Define API routes
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/bookings", bookingRouter);

// Serve React static files
const clientBuildPath = path.join(__dirname, "../client/build");
console.log(clientBuildPath);
app.use(express.static(clientBuildPath));

// Catch-all route for React
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Start the server
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

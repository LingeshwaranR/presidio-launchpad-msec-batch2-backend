import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import blogRoutes from "./routes/blogRoutes";
import favouriteRoutes from "./routes/favouriteRoutes";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;
// const PORT =  process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/favourite", favouriteRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// sequelize
//   .sync({ alter: true }) // or { force: true } for dev-only full reset
//   .then(() => {
//     console.log("Database synced successfully.");
//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Failed to sync database:", err);
//   });
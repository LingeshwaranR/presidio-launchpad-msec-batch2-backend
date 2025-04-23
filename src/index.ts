import express from "express";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes";
import favouriteRoutes from "./routes/favouriteRoutes";
import authRoutes from "./routes/authRoutes";
import sequelize from "./config/db";
dotenv.config();

const app = express();
app.use(express.json());
const PORT =  process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.use("/api/blog", blogRoutes);
app.use("/api/favourite", favouriteRoutes);
app.use('/api/auth', authRoutes);

sequelize
  .sync({ alter: true }) 
  .then(() => {
    console.log("Database synced successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });


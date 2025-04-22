import express from "express";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes";
import favouriteRoutes from "./routes/favouriteRoutes";
import authRoutes from "./routes/authRoutes";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;
// const PORT =  process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.use("/api/blog", blogRoutes);
app.use("/api/favourite", favouriteRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});




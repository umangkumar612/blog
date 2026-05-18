import dotenv from "dotenv";

dotenv.config();

console.log("Environment loaded. Starting Blogify API...");

const { app } = await import("./app.js");
console.log("Express app loaded.");

const { connectDB } = await import("./config/db.js");
console.log("Database module loaded.");

const PORT = process.env.PORT || 5000;

await connectDB();

app.listen(PORT, () => {
  console.log(`Blogify API running on port ${PORT}`);
});

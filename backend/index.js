import express from "express";
import cors from "cors";
let app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.json({ name: "Prashant", age: 22 });
});
app.post("/", (req, res) => {
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
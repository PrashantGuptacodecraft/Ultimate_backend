import express from "express";
import cors from "cors";
let app = express();
// app.use(cors(
//   {origin: "http://localhost:5173",}
// ));

app.use(express.json());///middleware
let password = "1234";

app.use((req, res, next) => {
  if(req.body.password != password){
    res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
});
app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
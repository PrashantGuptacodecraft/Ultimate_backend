import React from "react";
import axios from "axios";

function App() {
  let[name, setName] = React.useState("");
  let[age, setAge] = React.useState("");
  let[city, setCity] = React.useState("");

  async function getRes() {
    axios
      .get("http://localhost:3000")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="age" value={age} onChange={(e) => setAge(e.target.value)} />
      <input type="text" placeholder="city" value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={getRes}>Send</button>
    </div>
  );
}

export default App;
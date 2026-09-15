import React from "react";
import axios from "axios";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");

  async function getRes() {
    axios
      .post("http://localhost:3000", {
        name: name,
        age: age,
        city: city,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getRes}>Send</button>
    </div>
  );
}

export default App;
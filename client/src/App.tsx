import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Minimap } from "./Minimap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Minimap />
    </>
  );
}

export default App;

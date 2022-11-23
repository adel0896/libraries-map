import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import MyMap from "./components/MyMap";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <MyMap />
    </div>
  );
}

export default App;

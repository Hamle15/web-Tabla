import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import EmployeeList from "./components/EmployeeList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <EmployeeList />
    </>
  );
}

export default App;

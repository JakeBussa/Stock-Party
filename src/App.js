import Heading from "./components/Heading.js";
import StockDetails from "./components/StockDetails.js";
import StockGraph from "./components/StockGraph";
import PerformanceDetails from "./components/PerformanceDetails";
import "./App.css"

function App() {
  return (
    <>
      <Heading />
      <StockDetails />
      <StockGraph />
      <PerformanceDetails />
    </>
  );
}

export default App;

import Heading from "./components/Heading.js";
import StockDetails from "./components/StockDetails.js";
import StockGraph from "./components/StockGraph";
import PerformanceDetails from "./components/PerformanceDetails";

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

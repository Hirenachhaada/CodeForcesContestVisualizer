import { Route, Routes } from "react-router-dom";
import ProblemSolved from "./ProblemSolved";
import ApiCall from "./api";
import DistinctProblems from "./DistinctProblems";
import Help from "./Help";
import ScrollToTopButton from "./ScrollToTopButton"; // Import the button

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ApiCall />} />
        <Route path="/problemSolved" element={<ProblemSolved />} />
        <Route path="/distinctProblems" element={<DistinctProblems />} />
        <Route path="/help" element={<Help />} />
      </Routes>
      <ScrollToTopButton />
    </div>
  );
}

export default App;

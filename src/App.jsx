import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CandidateDetail from "./pages/CandidateDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidate/:name" element={<CandidateDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

import { HashRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CandidatePage from "./pages/CandidatePage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/candidate/:slug" element={<CandidatePage />} />
      </Routes>
    </HashRouter>
  );
}

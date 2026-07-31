import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Planner from "./pages/Planner";
import Loading from "./pages/Loading";
import Result from "./pages/Result";

import Itinerary from "./pages/Itinerary";
import Explore from "./pages/Explore";
import Food from "./pages/Food";
import Budget from "./pages/Budget";
import Essentials from "./pages/Essentials";
import Gallery from "./pages/Gallery";
import Assistant from "./pages/Assistant";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/planner" element={<Planner />} />

        <Route path="/loading" element={<Loading />} />

        <Route path="/result" element={<Result />} />

        <Route path="/itinerary" element={<Itinerary />} />

        <Route path="/explore" element={<Explore />} />

        <Route path="/food" element={<Food />} />

        <Route path="/budget" element={<Budget />} />

        <Route path="/essentials" element={<Essentials />} />

        <Route path="/gallery" element={<Gallery />} />

        <Route path="/assistant" element={<Assistant />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
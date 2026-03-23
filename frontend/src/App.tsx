import { BrowserRouter, Route, Routes } from "react-router-dom";
import VolunteersList from "./pages/VolunteersList";
import VolunteerCreate from "./pages/VolunteerCreate";
import VolunteerEdit from "./pages/VolunteerEdit";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<VolunteersList />} />
          <Route path="/create" element={<VolunteerCreate />} />
          <Route path="/edit/:id" element={<VolunteerEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
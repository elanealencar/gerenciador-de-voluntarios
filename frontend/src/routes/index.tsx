import { BrowserRouter, Routes, Route } from "react-router-dom";
import VolunteersList from "../pages/VolunteersList/index";
import VolunteerCreate from "../pages/VolunteerCreate/index";
import VolunteerEdit from "../pages/VolunteerEdit/index";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VolunteersList />} />
        <Route path="/create" element={<VolunteerCreate />} />
        <Route path="/edit/:id" element={<VolunteerEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
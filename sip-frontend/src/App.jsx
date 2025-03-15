import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import NextSIPDate from "./components/NextSIPDate";
import InstalmentDate from "./components/InstalmentDate";
import AddHoliday from "./components/AddHoliday";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-holiday" element={<AddHoliday />} />
        <Route path="/next-sip-date" element={<NextSIPDate />} />
        <Route path="/instalment-date" element={<InstalmentDate />} />
      </Routes>
    </Router>
  );
}

export default App;

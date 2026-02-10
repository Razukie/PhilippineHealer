import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AboutMe from "./pages/AboutMe";
import Services from "./pages/Services";
import Location from "./pages/Location";
import Gallery from "./pages/Gallery";
import Email from "./pages/Email";
import Upload from "./components/UploadForm";
import UploadDashboard from "./pages/UploadDashboard";

function App() {
  return (
    <Router>
      <Routes>

        {/* Default page */}
        <Route path="/" element={<Home />} />
       

        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/services" element={<Services />} />
        <Route path="/location" element={<Location />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contacts" element={<Email />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/upload-dashboard" element={<UploadDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;

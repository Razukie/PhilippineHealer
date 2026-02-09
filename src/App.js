import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import AboutMe from "./pages/AboutMe";
import Services from "./pages/Services";
import Location from './pages/Location'; // Import from your new pages folder
import Gallery from './pages/Gallery'; // Import from your new pages folder
import Email from "./pages/Email";
import Upload from "./components/UploadForm"; // ← import the page
import UploadDashboard from "./pages/UploadDashboard";

function App() {
  return (
    <Router>
      <Routes>

        {/* redirect root to /home */}
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/services" element={<Services />} />
        <Route path="/location" element={<Location />} /> {/* points to pages/Location.js */}
        <Route path="/gallery" element={<Gallery />} /> {/* points to pages/Location.js */}
        <Route path="/contacts" element={<Email />} /> {/* ← Make sure this exists */}
        <Route path="/upload" element={<Upload />} /> {/* ← New Upload route */}
        <Route path="/upload-dashboard" element={<UploadDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

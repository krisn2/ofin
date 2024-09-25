import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Contact from "./component/contect";
import Loans from "./component/loans";
import Apply from "./component/Apply";
import Footer from "./component/footer";
import Admin from "./component/admin";
import Dashboard from "./component/adminDashbord";
import { AuthProvider } from "./component/AuthContext"

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
          <Navbar />

          {/* Main content will grow to fill the remaining space */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/loans" element={<Loans />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>

          {/* Footer at the bottom */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
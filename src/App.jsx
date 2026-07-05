import NavBar from "./components/NavBar"
import Home from "./components/Home"
import Catalog from "./components/Catalog"
import Footer from "./components/Footer"
import "./App.css"

import { Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <div className="app-body">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Catalog" element={<Catalog />} />
      </Routes>
      <Footer />
    </div>
  )
}
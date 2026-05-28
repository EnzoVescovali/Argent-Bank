import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Router from "./routes/Router"
import { BrowserRouter } from "react-router-dom"


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Router />
      <Footer />
    </BrowserRouter>
  )
}

export default App

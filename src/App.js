import "./App.css";
import NavBar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/Loginform";
import { BrowserRouter } from "react-router-dom";
import RegisterForm from "./components/Registerform";
import BlogPage from "./components/PostList";

function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/blogs" element={<BlogPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

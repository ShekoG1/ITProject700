import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./islands/NavBar";
// Import Pages
import Login from "./views/auth/Login";
// import Academics from "./views/Academics"
// import Dashboard from "./view/Dashboard";
// import Finances from "./view/Finances";
// import StudentDetails from "./view/StudentDetails";


function App() {

  return (
    <Login />
    
    // <>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<NavBar />}>
    //         <Route index element={<Login/>} />
    //         {/* <Route path="latest" element={<ViewBlog/>} />
    //         <Route path="latest" element={<Academics/>} />
    //         <Route path="latest" element={<Dashboard/>} />
    //         <Route path="latest" element={<Finances/>} />
    //         <Route path="latest" element={<StudentDetails/>} /> */}
    //       </Route>
    //     </Routes>
    //   </BrowserRouter>
    // </>
  );
}

export default App;

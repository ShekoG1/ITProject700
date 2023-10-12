import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route index element={<Landing/>} />
            <Route path="latest" element={<ViewBlog/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

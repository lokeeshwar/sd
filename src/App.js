import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/homepage" element={<HomePage />} />
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

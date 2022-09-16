import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Articles from "./pages/Articles";
import Create from "./pages/Create";
import Article from "./pages/Article";
function App() {
  return (
    <div className="py-10">
      <Router>
        <Routes>
          <Route path="/view/:id" element={<Article />} />
          <Route path="/create" element={<Create />} />
          <Route path="/" element={<Articles />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

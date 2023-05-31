import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";

function App() {
  return (
    <div>
      <Router>
      <Routes>
          <Route path="/" exact element={<Login/>}/>
          <Route path="/chat" exact element={<Home/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;

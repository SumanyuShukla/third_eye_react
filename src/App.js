import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Template from "./components/template";
import Chatdoc from "./components/chatdoc";

function App() {
  return (
    <div>
      <Router>
      <Routes>
          <Route path="/" exact element={<Login/>}/>
          <Route path="/chat" exact element={<Home/>}/>
          <Route path="/template" exact element={<Template/>}/>
          <Route path="/docs" exact element={<Chatdoc/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;

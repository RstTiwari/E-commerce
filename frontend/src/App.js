
import './App.css';
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js"
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom'

function App() {
  return (
        <Router>
          <Header />
        </Router>
  );
}

export default App;

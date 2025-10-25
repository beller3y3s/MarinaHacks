import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PastelButtons from './PastelButtons';
import Activities from './activities';
import AboutPage from './AboutPage';
import Events from './Events';
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PastelButtons />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

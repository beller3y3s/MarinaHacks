import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PastelButtons from './PastelButtons';
import Activities from './activities';
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PastelButtons />} />
          <Route path="/activities" element={<Activities />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

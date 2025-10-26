import { useState } from 'react'
import '../events.css'

function Events() {
  const [selectedPeople, setSelectedPeople] = useState('how many people?')
  const [showDropdown, setShowDropdown] = useState(false)

  const peopleOptions = ['1 person', '2 people', '3 people', '4 people', '5+ people']

  const handleSelectPeople = (option) => {
    setSelectedPeople(option)
    setShowDropdown(false)
  }

  const handleButton1Click = () => {
    console.log('Button 1 clicked')
  }

  const handleButton2Click = () => {
    console.log('Button 2 clicked')
  }

  const handleButton3Click = () => {
    console.log('Button 3 clicked')
  }

  return (
    <div className="events-container">
      <div className="events-dropdown-container">
        <button 
          className="events-dropdown-button"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {selectedPeople}
          <span className="dropdown-arrow">{showDropdown ? '▲' : '▼'}</span>
        </button>
        
        {showDropdown && (
          <div className="events-dropdown-menu">
            <button
              className="events-dropdown-option header-option"
              onClick={() => {
                setSelectedPeople('how many people?')
                setShowDropdown(false)
              }}
            >
              how many people?
            </button>
            {peopleOptions.map((option) => (
              <button
                key={option}
                className="events-dropdown-option"
                onClick={() => handleSelectPeople(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="events-buttons-container">
        <button 
          className="events-button"
          onClick={handleButton1Click}
        >
          Button 1
        </button>
        
        <button 
          className="events-button"
          onClick={handleButton2Click}
        >
          Button 2
        </button>
        
        <button 
          className="events-button"
          onClick={handleButton3Click}
        >
          Button 3
        </button>
      </div>
    </div>
  )
}

export default Events

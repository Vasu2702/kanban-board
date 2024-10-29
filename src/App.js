import React, { useState, useEffect } from 'react';
import Board from './Board';
import DisplayPopup from './DisplayPopup';
import './App.css';
import displayIcon from './Display.svg';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Fetch tickets and users from the API
  useEffect(() => {
    const fetchTicketsAndUsers = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchTicketsAndUsers();
  }, []);

  // Load groupBy and sortBy from localStorage on initial load
  useEffect(() => {
    const savedGroupBy = localStorage.getItem('groupBy' || 'status');
    const savedSortBy = localStorage.getItem('sortBy' || "title");
    
    if (savedGroupBy) {
      setGroupBy(savedGroupBy);
    }
    
    if (savedSortBy) {
      setSortBy(savedSortBy);
    }
  }, []);

  // Store groupBy and sortBy in localStorage whenever they change
  const handleGroupByChange = (newGroupBy) => {
    setGroupBy(newGroupBy);
    localStorage.setItem('groupBy', newGroupBy);
  };

  const handleSortByChange = (newSortBy) => {
    setSortBy(newSortBy);
    localStorage.setItem('sortBy', newSortBy);
  };

  // Toggle display popup visibility
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <button className="display-button" onClick={togglePopup}>
          <img src={displayIcon} alt="Display Icon" className="display-icon" />Display
        </button>
      </nav>

      {/* Display Popup */}
      {isPopupOpen && (
        <DisplayPopup
          groupBy={groupBy}
          setGroupBy={handleGroupByChange} // Use the new handler
          sortBy={sortBy}
          setSortBy={handleSortByChange}   // Use the new handler
          closePopup={() => setIsPopupOpen(false)}
        />
      )}

      {/* Main Kanban Board */}
      <Board tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
}

export default App;

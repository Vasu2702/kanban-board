// DisplayPopup.js
import React, { useEffect, useRef } from 'react';
import './DisplayPopup.css';

function DisplayPopup({ groupBy, setGroupBy, sortBy, setSortBy, closePopup }) {
  const popupRef = useRef(null);

  // Close popup on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closePopup]);

  return (
    <div className="display-popup" ref={popupRef}>
      {/* Group By and Sort By sections */}
      <div className="popup-row">
        <h3>Grouping</h3>
        <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="popup-row">
        <h3>Ordering</h3>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
}

export default DisplayPopup;

import React, { useMemo } from 'react';
import './TicketCard.css';
import one from './1.svg';
import two from './2.svg';
import three from './3.svg';
import four from './4.svg';
import zero from './default.svg';
import todo from './To-do.svg';
import back from './Backlog.svg';
import prog from './in-progress.svg';

function TicketCard({ ticket, groupBy, users }) {
  const user = users.find((u) => u.id === ticket.userId);

  const getStatusImage = (status) => {
    switch (status) {
      case 'Todo':
        return todo;
      case 'In progress':
        return prog;
      default:
        return back;
    }
  };

  const getPriorityImage = (priority) => {
    switch (priority) {
      case 1:
        return one;
      case 2:
        return two;
      case 3:
        return three;
      case 4:
        return four;
      default:
        return zero;
    }
  };

  // Helper function to get user initials for avatar display
  const getUserInitials = (name) => {
    const initials = name
      ? name.split(' ').map((n) => n[0]).join('').toUpperCase()
      : '';
    return initials;
  };

  // Function to generate a random color (using HSL for a wide color range)
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360); // Random hue for variety
    return `hsl(${hue}, 70%, 80%)`; // Soft pastel colors
  };

  // Use useMemo to generate a color for each user only once
  const backgroundColor = useMemo(() => getRandomColor(), [user?.id]);

  return (
    <div className="ticket-card">
      <p className="user-id">{ticket.id}</p>
      <div className="ticket-header">
      {groupBy === 'priority' && (
  <div className='prior'>
    <img
      src={getStatusImage(ticket.status)}
      alt={`Status: ${ticket.status}`}
      className="status-image"
    />
    <h3 className="priorityy">{ticket.title}</h3> {/* Ticket Title */}
    <div
      className="avatar-initials right-corner"
      style={{ backgroundColor }}
    >
      {getUserInitials(user?.name || 'U')}
    </div>
  </div>
)}


        {/* Show title only for user grouping */}
        {groupBy === 'user' && (
          <>
            <img
              src={getStatusImage(ticket.status)}
              alt={`Status: ${ticket.status}`}
              className="status-image"
            />
            <h3 className="ticket-title user-group">{ticket.title}</h3> {/* Title for user grouping */}
          </>
        )}

        {/* Show title only for status grouping */}
        {groupBy === 'status' && (
          <>
          <h3 className="ticket-title status-group">{ticket.title}</h3> {/* Title for status grouping */}
            <div
              className="avatar-initials right-corner"
              style={{ backgroundColor }}
            >
              {getUserInitials(user?.name || 'U')}
            </div>
           
          </>
        )}
      </div>

      <div className="priority-features-container">
        {groupBy !== 'priority' && (
          <img
            src={getPriorityImage(ticket.priority)}
            alt={`Priority ${ticket.priority}`}
            className="priority-image"
          />
        )}
        <div className="features-box">
          <div className="grey-box"></div>
          <span>Features Request</span>
        </div>
      </div>
    </div>
  );
}

export default TicketCard;

import React from 'react';
import TicketCard from './TicketCard';
import './Board.css';
import add from './add.svg';
import threedot from './threedot.svg';
import todo from './To-do.svg';
import back from './Backlog.svg';
import prog from './in-progress.svg';
import done from './Done.svg';
import canceled from './Cancelled.svg';
import one from './1.svg';
import two from './2.svg';
import three from './3.svg';
import four from './4.svg';
import zero from './default.svg';

function Board({ tickets, users, groupBy, sortBy }) {
  const getStatusImage = (status) => {
    switch (status) {
      case 'Todo':
        return todo;
      case 'In progress':
        return prog;
      case 'Done':
        return done;
      case 'Canceled':
        return canceled;
      default:
        return back;
    }
  };

  const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
  const groupedTickets = groupTickets(tickets, users, groupBy, sortBy);

  return (
    <div className="board">
      {Object.keys(groupedTickets).map((groupKey) => (
        <div key={groupKey} className="board-column">
          {groupBy === 'user' ? (
            <div className="user-header">
              <Avatar user={getUserObject(groupKey, sortedUsers)} />
              <span className="user-name">
                {getUserObject(groupKey, sortedUsers).name} {groupedTickets[groupKey].length}
              </span>
              <img src={add} alt="Add" className="icon-plus" />
              <img src={threedot} alt="Options" className="icon-three-dots" />
            </div>
          ) : groupBy === 'status' ? (
            <div className="status-header">
              <div className="status-header-left">
                <img src={getStatusImage(groupKey)} alt={`${groupKey} icon`} className="status-image" />
                <span className="status-name">{groupKey} {groupedTickets[groupKey].length}</span>
              </div>
              {groupKey !== 'Canceled' && (
                <div className="status-header-right">
                  <img src={add} alt="Add" className="icon-plus" />
                  <img src={threedot} alt="Options" className="icon-three-dots" />
                </div>
              )}
            </div>
          ) : groupBy === 'priority' ? (
            <div className="priority-header">
              <div className="priority-header-left">
                <img src={getPriorityImage(groupKey)} alt={`Priority ${groupKey}`} className="priority-image" />
                <span className="priority-name"> {groupKey} {groupedTickets[groupKey].length}</span>
              </div>
              <div className="priority-header-right">
                <img src={add} alt="Add" className="icon-plus" />
                <img src={threedot} alt="Options" className="icon-three-dots" />
              </div>
            </div>
          ) : null}

          {/* Tickets in each column */}
          {groupedTickets[groupKey].map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} groupBy={groupBy} users={users} />
          ))}
        </div>
      ))}
    </div>
  );
}

// Helper functions remain the same
function getUserObject(userId, users) {
  return users.find((u) => u.id === userId) || { name: 'Unknown User', img: null };
}

function Avatar({ user }) {
  const { name, img } = user;
  const initials = name
    ? name.split(' ').map((word) => word[0]).join('')
    : 'U';
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return img ? (
    <img src={img} alt={`${name}'s avatar`} className="avatar-img" />
  ) : (
    <div className="avatar-initials" style={{ backgroundColor: randomColor }}>
      {initials}
    </div>
  );
}

function getPriorityImage(priority) {
  switch (priority) {
    case 'Low':
      return one;
    case 'Medium':
      return two;
    case 'High':
      return three;
    case 'Urgent':
      return four;
    default:
      return zero;
  }
}
function groupTickets(tickets, users, groupBy, sortBy) {
  const priorityLabels = {
    0: 'No priority',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent',
  };

  const sortedTickets = tickets.reduce((acc, ticket) => {
    const key =
      groupBy === 'user'
        ? ticket.userId
        : groupBy === 'priority'
        ? ticket.priority
        : ticket.status || 'Uncategorized';

    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  // Sort tickets within each group based on sortBy option
  Object.keys(sortedTickets).forEach((key) => {
    sortedTickets[key].sort((a, b) => {
      if (sortBy === 'priority') return b.priority - a.priority;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  });

  // Ensure that "Done" and "Canceled" statuses are included with empty arrays if they have no tickets
  if (groupBy === 'status') {
    ['Todo', 'In progress', 'Done', 'Canceled'].forEach((status) => {
      if (!sortedTickets[status]) {
        sortedTickets[status] = [];
      }
    });
  }

  // Maintain priority ordering if grouped by priority
  if (groupBy === 'priority') {
    const priorityOrder = [4, 3, 2, 1, 0]; // Adjusted priority order for rendering
    const orderedTickets = {};
    priorityOrder.forEach((priority) => {
      if (sortedTickets[priority] !== undefined) {
        orderedTickets[priorityLabels[priority]] = sortedTickets[priority]; // Use only the label
      }
    });
    return orderedTickets;
  }

  // Maintain user ordering if grouped by user
  if (groupBy === 'user') {
    const orderedTickets = {};
    users.forEach((user) => {
      if (sortedTickets[user.id]) {
        orderedTickets[user.id] = sortedTickets[user.id];
      }
    });
    return orderedTickets;
  }

  return sortedTickets;
}



export default Board;

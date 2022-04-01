import React from 'react';

export const CalendarEvent = ({event}) => {
    const {title, user} = event
  return <div>
      <strong> {title} </strong> <br/>
      <strong>- {user.name}</strong>
  </div>;
};

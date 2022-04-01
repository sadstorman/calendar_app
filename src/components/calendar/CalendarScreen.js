import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es';
import { messages } from '../../helpers/calendar-messages-esp'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventRemoveActive, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {

  const dispatch = useDispatch()
  const {activeEvent} = useSelector( state => state.calendar)
  const eventos = useSelector( state => state.calendar.events)
  const {uid} = useSelector( state => state.auth)

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  useEffect(() => {
    dispatch( eventStartLoading() )
  }, [dispatch])
  

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal())
  }

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e))
  }
  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const onSelectSlot = ( e ) => {
    dispatch( eventRemoveActive() )
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }

    return {
      style
    }
  }

  return <div className='calendar-screen'>

    <Navbar />
    <h1>Calendar screen</h1>

    <Calendar
      localizer={localizer}
      events={eventos}
      startAccessor="start"
      endAccessor="end"
      messages={messages}
      eventPropGetter={eventStyleGetter}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelectEvent}
      onView={onViewChange}
      onSelectSlot={ onSelectSlot }
      selectable={ true }
      view={lastView}
      components={{
        event: CalendarEvent
      }}
    />

    <AddNewFab />

    { (activeEvent) && <DeleteEventFab/>}

    <CalendarModal />
  </div>;
};

import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {

        const {uid, name} = getState().auth
        try {

            const resp = fetchConToken('events', event, 'POST');
            const body = await (await resp).json()

            if(body.ok) {
                event.id = body.evento.id
                event.user = {
                    _id: uid,
                    name: name
                }

                dispatch( eventAddNew(event))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
})

export const eventRemoveActive = () => ({
    type: types.eventRemoveActive
})

export const eventStartUpdate = (event) => {
    return async (dispatch) => {

        try {

            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT')
            const body = await resp.json()

            if(body.ok) {
                dispatch( eventUpdate( event ) )

                Swal.fire('Evento modificado', body.msg, 'success')
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
            
        } catch (error) {
            console.log(error);
        }

    }
}

const eventUpdate = (event) => ({
    type: types.eventUpdated,
    payload: event
})

export const eventStartDelete = (event) => {
    return async (dispatch, getState) => {

        const {id} = getState().calendar.activeEvent

        try {
            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE')
            const body = await resp.json()

            if(body.ok) {
                dispatch( eventDeleted() )
                Swal.fire('Evento eliminado', body.msg, 'success')
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error);
        }

    }
}
const eventDeleted = () => ({
    type: types.eventDeleted
})

export const eventLogOut = () => ({
    type: types.eventLogOut
})

export const eventStartLoading = () => {
    return async (dispatch) => {

        
        try {

            const resp = await fetchConToken('events')
            const body = await resp.json()
            const events = prepareEvents( body.eventos )
            dispatch( eventLoaded(events))
 
        } catch (error) {
            console.log(error);
        }
    }
}

const eventLoaded = ( events ) => ({
    type: types.eventLoaded,
    payload: events
})
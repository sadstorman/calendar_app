import { types } from "../types/types";

// {
//     id: 'DB_ID',
//     title: 'Cumple del nestor 0_o',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     notes: 'comprar un ojo nuebo',
//     user: {
//         _id: '123',
//         name: 'juanelo'
//     }
// }

const initialState = {
    events: [],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        case types.eventRemoveActive:
            return {
                ...state,
                activeEvent: null
            }
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    e => ( e.id === action.payload.id) ? action.payload : e
                )
            }
        case types.eventDeleted:
            return{
                ...state,
                events: state.events.filter(
                    e => ( e.id !== state.activeEvent.id)
                ),
                activeEvent: null
            }
        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }
        case types.eventLogOut:
            return {}
        default:
            return state;
    }
}
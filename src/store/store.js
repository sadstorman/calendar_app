import { rootReducer } from '../reducers/rootReducers'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'


//Create reducers acepta sola una funcion, por lo que me creo un OBJETO que COMBINA los reducers,
//entonces si quiero agregar mas reducers, simplemente los agrego al objeto
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)
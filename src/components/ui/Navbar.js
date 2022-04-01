import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogOut } from '../../actions/auth';
import { eventLogOut } from '../../actions/events';

export const Navbar = () => {

    const { name } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(startLogOut())
        dispatch( eventLogOut() )
    }

    return (
        <div className='navbar navbar-dark bg-dark mb-4'>
            <span className='navbar-brand'>
                {name}
            </span>

            <button className='btn btn-outline-danger'
                onClick={logOut}
            >
                <i className='fas fa-sign-out-alt'> </i>
                <span> Salir</span>
            </button>

        </div>
    );
};

import React,{ useReducer } from 'react';
import  {v1 as uuid} from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const intialState = {
        contacts: [
            {
                id: 1,
                name: "Ajay",
                email: "aj@gmail.com",
                phone: "13234",
                type: "personal"
            },
            {
                id: 2,
                name: "Bijay",
                email: "bj@gmail.com",
                phone: "23434",
                type: "personal"
            },            {
                id: 3,
                name: "Cjay",
                email: "cj@gmail.com",
                phone: "42523234",
                type: "professional"
            }
        ],
        current: null,  // current is used when a particular user is selected for update
        filtered: null
    };
    
    const [state, dispatch] = useReducer(contactReducer, intialState);

    //Add Contact 
        const addContact = contact => {
            contact.id = uuid();
            dispatch({ 
                type: ADD_CONTACT,
                payload: contact
            });
        }

    //Delete Contact
        const deleteContact = id => {
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            })
        }
        
    //Set current contact
        const setCurrent = contact => {
            dispatch({ 
                type: SET_CURRENT,
                payload: contact
            });
        }
        
    //Clear current contact
        const clearCurrent  = () => {
            dispatch({ 
                type: CLEAR_CURRENT
            });
        }
    //Update the contact
        const updateContact = contact => {
            dispatch({
                type:UPDATE_CONTACT,
                payload:contact
            });
        }

    //Filter contacts
        const filterContacts = text => {
            dispatch({
                type: FILTER_CONTACTS,
                payload: text
            });
        }

    //Clear filter
        const clearFilter = () => {
            dispatch({
                type: CLEAR_FILTER
            });
        }
    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                clearFilter,
                filterContacts
            }}

        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
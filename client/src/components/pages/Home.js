import React,{ useContext, useEffect } from 'react'
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        //eslint-diable-next-line
    }, [])

    return (
        <div className='grid-2'>
            <div>
                <ContactForm />         {/* Contact form to add contact */}
            </div>
            <div>
                <ContactFilter />       {/* Filter used to filter user on the basis of name and email*/}
                <Contacts />            {/* Contact added in the list */}
            </div>
        </div>
    )
}

export default Home;

import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts, filtered } = contactContext;

    if(contacts.length == 0) {
        return <h4>Please add a contact</h4>
    }

    return (
    
        <Fragment>
            <TransitionGroup>
            {filtered !== null ?                    /* filtered contains the contact which are filtered on the basis of text entered in the filter bar*/
                        filtered.map(contact => (
                            <CSSTransition key={contact.id} timeout={500} classNames="item" >
                                <ContactItem  contact={contact} />
                            </CSSTransition>
                        )) 
                        :
                        contacts.map(contact =>( 
                            <CSSTransition key={contact.id} timeout={500} classNames="item" > 
                                <ContactItem 
                                    key={contact.id}
                                    contact={contact}
                                />                
                            </CSSTransition>
                        ))}
            </TransitionGroup>
        </Fragment>
    )
}

export default Contacts;

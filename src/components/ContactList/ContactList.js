import { useSelector } from 'react-redux';
import { List } from './ContactList.styled';
import ContactItem from '../ContactItem/ContactItem';
import { useGetContactsQuery } from '../../redux/contacts-api';

const ContactList = () => {
  const userName = useSelector(state => state.auth.user.name);
  const { currentData: contacts, isFetching } = useGetContactsQuery(userName);
  const filterSelector = useSelector(state => state.filter);

  // // Фильтрация списка контактов
  if (contacts) {
    const normalizedFilter = filterSelector.toLowerCase();
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <>
        {isFetching && <div>Loading...</div>}
        <List>
          {filterContacts.map(({ name, number, id }) => (
            <ContactItem key={id} name={name} number={number} id={id} />
          ))}
        </List>
      </>
    );
  }
};

export default ContactList;

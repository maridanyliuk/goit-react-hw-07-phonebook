import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts, deleteContact } from 'redux/operations';
import {
  selectFilteredContacts,
  selectIsLoading,
  selectError,
} from 'redux/selectors';

export const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      {isLoading && <div></div>}
      {!filteredContacts?.length && !error && !isLoading && (
        <p>No contacts found.</p>
      )}
      {error && <p>{error}</p>}
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            <p>
              {contact.name}: <span>{contact.number}</span>
            </p>
            <button type="button" onClick={() => onDeleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

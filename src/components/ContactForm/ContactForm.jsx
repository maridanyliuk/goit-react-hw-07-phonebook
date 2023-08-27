import { Formik, Field } from 'formik';
import { Form, ErrorMessage } from './ContactForm.styled';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations'; // Вкажіть правильний шлях до вашого contactsSlice // Вкажіть правильний шлях до вашого селектора контактів

import { selectContacts } from 'redux/selectors';

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Required field!'),
  number: Yup.number().positive('Must be > 0!').required('Required field!'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, actions) => {
    const isExist = contacts.find(
      ({ name }) => name.toLowerCase() === values.name.toLowerCase()
    );

    if (isExist) {
      alert(`${values.name} is already in your contacts list`);
    }

    dispatch(addContact({ ...values, id: nanoid() }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={FormSchema}
    >
      <Form>
        <label>Name</label>
        <Field name="name" />
        <ErrorMessage name="name" component="span" />
        <label>Number</label>
        <Field type="number" name="number" />
        <ErrorMessage name="number" component="span" />
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};
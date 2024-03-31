import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from '../../../public/posgass logo.jpg';
import React from 'react';
import * as Yup from 'yup';
import { useEventRegistrationState } from './context';

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Please input a valid email'),
});

export const RegistrationPage = () => {
  const { loading, eventRegistration } = useEventRegistrationState();

  const handleSubmit = (val: any, actions: any) => {
    eventRegistration(val.email).then((res) => {
      if (res) {
        actions.resetForm({
          values: {
            email: '',
          },
        });
      }
    });
  };
  return (
    <div className='font-primary translate-y-1/5 mx-12 flex -translate-x-[0%] transform items-center justify-center md:mx-0 md:translate-y-1/4'>
      <div className='text-center'>
        <div className='my-3 flex items-center justify-center'>
          <img
            src={'/public/images/posgass-logo.jpg'}
            alt='pogsass logo'
            width={100}
            height={100}
          />
        </div>
        <h1 className='mb-4 text-4xl font-bold'>Sign Up for waitlist</h1>
        <div>
          <p className='font-bold'>Theme:</p>
          <p className='text-4xl font-bold text-green-500'>
            {' '}
            Research For Innovation and Commercialization:
          </p>
          <p className='mb-2 text-2xl font-bold text-green-500'>
            {' '}
            Our Role as Young Researchers
          </p>
        </div>
        <Formik
          enableReinitialize
          initialValues={{ email: '' }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              name='email'
              type='email'
              placeholder='Enter your email here'
              className='my-4 w-full rounded-md p-2 outline-none'
            />
            <ErrorMessage
              className='text-red-500'
              name={'email'}
              component='div'
            />
            <button
              type='submit'
              className='my-4 w-full  rounded-md bg-green-500 p-2 text-white'
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

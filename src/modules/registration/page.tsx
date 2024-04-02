import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from 'next/image';
import React from 'react';
import * as Yup from 'yup';

import { useEventRegistrationState } from './context';
import { IEventReg } from '../model';

const Options = [
  {
    label: 'AI Tools for Research',
    value: 'AI Tools for Research',
  },
  {
    label: 'Statistical Tools for Research',
    value: 'Statistical Tools for Research',
  },
];
const FormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required to be input')
    .email('Please input a valid email'),
  phoneNumber: Yup.string().required('Phone Number is required to be input'),
  workshopEvent: Yup.string().required(
    'Workshop Event is required to be selected'
  ),
});

export const RegistrationPage = () => {
  const { loading, eventRegistration } = useEventRegistrationState();

  const handleSubmit = (
    val: IEventReg,
    actions: {
      resetForm: (arg0: {
        values: { email: string; phoneNumber: string; workshopEvent: string };
      }) => void;
    }
  ) => {
    eventRegistration(val).then((res) => {
      if (res) {
        actions.resetForm({
          values: {
            email: '',
            phoneNumber: '',
            workshopEvent: '',
          },
        });
      }
    });
  };
  return (
    <div className='font-primary translate-y-1/5 mx-12 flex -translate-x-[0%] transform items-center justify-center md:mx-0 md:translate-y-1/4'>
      <div className='text-center'>
        <div className='my-3 flex items-center justify-center'>
          <Image
            src='/images/posgass-logo.jpg'
            alt='pogsass logo'
            width={100}
            height={100}
          />
        </div>
        <h1 className='mb-4 text-xl font-bold'>
          Register for the POGSASS Innovation Conference and Workshop.
        </h1>
        <div>
          <p className='font-bold'>Theme:</p>
          <p className='text-2xl font-bold text-green-500'>
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
          initialValues={{
            email: '',
            phoneNumber: '',
            workshopEvent: 'AI Tools for Research',
          }}
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
            <Field
              name='phoneNumber'
              type='tel'
              placeholder='Enter your phone number here'
              className='my-4 w-full rounded-md p-2 outline-none'
            />
            <label className='flex justify-start'>
              Select Workshop Event for Day 2
            </label>
            <Field
              as='select'
              name='workshopEvent'
              className='my-4 w-full rounded-md p-2 outline-none'
            >
              {Options.map((o, i: number) => (
                <option key={i} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Field>
            <ErrorMessage
              className='text-red-500'
              name='email'
              component='div'
            />
            <ErrorMessage
              className='text-red-500'
              name='phoneNumber'
              component='div'
            />
            <ErrorMessage
              className='text-red-500'
              name='workshopEvent'
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

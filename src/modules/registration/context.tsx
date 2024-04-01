import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { IEventReg } from '../model';

interface IEventRegistrationState {
  loading: boolean;
  eventRegistration: (payload: IEventReg) => Promise<any>;
}

const EventRegistrationContext = React.createContext<IEventRegistrationState>({
  loading: false,
  eventRegistration(email) {
    return null as any;
  },
});

export const useEventRegistrationState = () => {
  const context = React.useContext(EventRegistrationContext);
  if (context === undefined) {
    throw new Error('app dispatch must be used within app global provider');
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const EventRegistrationContextProvider: React.FC<IProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const eventRegistration = async (payload: IEventReg) => {
    setLoading(true);
    console.log(JSON.stringify(payload));
    try {
      const res = await axios({
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_ROUTE}/event-registration`,
        data: JSON.stringify(payload),
      });
      setLoading(false);
      const data = await res.data;
      console.log(data);
      if (data) {
        toast.success(data);
      }
      return data;
    } catch (error: any) {
      console.log(error?.response?.data?.error);
      setLoading(false);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <EventRegistrationContext.Provider
      value={{
        loading,
        eventRegistration,
      }}
    >
      {children}
    </EventRegistrationContext.Provider>
  );
};

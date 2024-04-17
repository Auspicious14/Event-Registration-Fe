import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { IEventReg } from './model';

interface IEventRegistrationState {
  loading: boolean;
  totalRecords: number;
  aITotalRecords: number;
  statTotalRecords: number;
  eventRegistration: (payload: IEventReg) => Promise<string>;
  getAllAttendees: () => Promise<any>;
  getAllAttendeesByEvent: () => Promise<any>;
}

const EventRegistrationContext = React.createContext<IEventRegistrationState>({
  loading: false,
  totalRecords: 0,
  aITotalRecords: 0,
  statTotalRecords: 0,
  eventRegistration() {
    return null as any;
  },
  getAllAttendees() {
    return null as any;
  },
  getAllAttendeesByEvent() {
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
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [aITotalRecords, setAiTotalRecords] = useState<number>(0);
  const [statTotalRecords, setStatTotalRecords] = useState<number>(0);

  const eventRegistration = async (payload: IEventReg) => {
    setLoading(true);
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
      if (data) {
        toast.success(data);
      }
      return data;
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.error);
    }
  };

  const getAllAttendees = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_ROUTE}/attendees`,
      });

      const data = await res?.data;
      if (data) {
        setTotalRecords(data.totalRecords);
      }
      return data;
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };

  const getAllAttendeesByEvent = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_ROUTE}/attendees/event`,
      });

      const data = await res?.data;
      if (data) {
        setAiTotalRecords(data.ai.totalRecords);
        setStatTotalRecords(data.statistical.totalRecords);
        return data;
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };
  return (
    <EventRegistrationContext.Provider
      value={{
        loading,
        eventRegistration,
        getAllAttendees,
        getAllAttendeesByEvent,
        totalRecords,
        aITotalRecords,
        statTotalRecords,
      }}
    >
      {children}
    </EventRegistrationContext.Provider>
  );
};

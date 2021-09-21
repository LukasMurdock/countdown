import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { countdownProps } from 'types/types';
import {
  set,
  startOfWeek,
  addDays,
  formatDuration,
  intervalToDuration
} from 'date-fns';
import DateItem from '@/components/DateItem';
import DateList from '@/components/DateList';

const Home: NextPage = () => {
  //   const currentDateTime = new Date();

  const [currentDateTime, setCurrentDateTime] = useState<Date>();
  const [dateListView, setDateListView] = useState<'day' | 'week'>('week');

  useEffect(() => {
    setCurrentDateTime(new Date());

    const interval = setInterval(() => {
      const loadDate = new Date();

      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!currentDateTime) {
    return null;
  }

  const todayFormat = currentDateTime.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const lastUpdatedFormat = currentDateTime.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  const countdown = {
    Monday: {
      items: [
        { name: 'CSE 174', time: '10:05' },
        { name: 'MKT 315', time: '13:15' }
      ]
    },
    Tuesday: {
      items: [
        { name: 'MKT 395', time: '10:05' },
        { name: 'MGT 302', time: '14:50' }
      ]
    },
    Wednesday: {
      items: [
        { name: 'ISA 225', time: '08:30' },
        { name: 'CSE 174', time: '10:05' },
        { name: 'MKT 315', time: '13:15' }
      ]
    },
    Thursday: {
      items: [
        { name: 'MKT 395', time: '10:05:00' },
        { name: 'MGT 302', time: '14:50:00' }
      ]
    },
    Friday: {
      items: [
        { name: 'ISA 225', time: '08:30:00' },
        { name: 'CSE 174 Lab', time: '10:05:00' }
      ]
    },
    Saturday: {},
    Sunday: {}
  } as countdownProps;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-6 m-auto prose">
        <p className="m-0 text-sm text-gray-400">{lastUpdatedFormat}</p>
        <h1 className="pb-2 m-0 font-serif text-gray-600 ">{todayFormat}</h1>

        <DateList
          dayView={dateListView}
          countdown={countdown}
          currentDateTime={currentDateTime}
        />
      </div>
    </div>
  );
};

export default Home;
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { countdownProps } from 'types/types';
import {
  set,
  startOfWeek,
  addDays,
  formatDuration,
  intervalToDuration,
  differenceInDays
} from 'date-fns';
import DateItem from '@/components/DateItem';
import DateList from '@/components/DateList';
import useSound from 'use-sound';
import TimeUntil from '@/components/TimeUntil';
import Weather from '@/components/Weather';

const countdown = {
  Monday: {
    items: []
  },
  Tuesday: {
    items: [
      { name: 'MKT 335', startTime: '08:30', endTime: '09:50' },
      { name: 'CSE 271 (HUG 158)', startTime: '12:10', endTime: '02:00' },
      { name: 'ECO 202', startTime: '14:50', endTime: '16:10' },
      { name: 'CSE 252', startTime: '16:25', endTime: '17:45' }
    ]
  },
  Wednesday: {
    items: []
  },
  Thursday: {
    items: [
      { name: 'MKT 335', startTime: '08:30', endTime: '09:50' },
      { name: 'CSE 271 (BEN 009)', startTime: '12:10', endTime: '02:00' },
      { name: 'ECO 202', startTime: '14:50', endTime: '16:10' },
      { name: 'CSE 252', startTime: '16:25', endTime: '17:45' }
    ]
  },
  Friday: {
    items: []
  },
  Saturday: {},
  Sunday: {},
  Other: {
    items: [
      {
        name: 'First day of Spring',
        date: new Date(2022, 1 - 1, 24),
        startTime: '12:00:00'
      },
      {
        name: 'Charter Ball',
        date: new Date(2022, 2 - 1, 19),
        startTime: '20:00:00'
      },
      {
        name: 'Exam week',
        date: new Date(2022, 5 - 1, 9),
        startTime: '19:00:00'
      },
      {
        name: 'Out',
        date: new Date(2022, 5 - 1, 15),
        startTime: '19:00:00'
      },
      {
        name: 'Birthday2',
        date: new Date(new Date().getFullYear(), 7 - 1, 7),
        startTime: '12:00:00'
      },
      {
        name: 'Birthday',
        date: new Date(new Date().getFullYear(), 12 - 1, 9),
        startTime: '12:00:00'
      }
    ]
  }
} as countdownProps;

const Home: NextPage = () => {
  //   const currentDateTime = new Date();

  const semester = {
    start: '01/24/2022',
    end: '05/07/2022'
  };

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

  // const [playActive] = useSound(
  //   '/assets/audio/duck.mp3',
  //   { volume: 0.25 }
  // );
  // onMouseDown={playActive}

  return (
    <div>
      <Head>
        <title>{todayFormat}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-6 m-auto prose">
        <p className="m-0 text-sm text-gray-400 ">{lastUpdatedFormat}</p>
        <h1 className="pb-2 m-0 font-serif text-gray-600 ">{todayFormat}</h1>
        <Weather />
        <DateList
          dayView={dateListView}
          countdown={countdown}
          currentDateTime={currentDateTime}
        />
      </div>
      <div className="p-6 m-auto prose">
        <h2 className="flex items-baseline justify-between pb-2 m-0 font-serif text-gray-600">
          Semester progress{' '}
          <span className="font-sans text-sm">
            {Math.round(
              (differenceInDays(currentDateTime, new Date(semester.start)) /
                differenceInDays(
                  new Date(semester.end),
                  new Date(semester.start)
                ) +
                Number.EPSILON) *
                100
            )}
            %
          </span>
        </h2>
        <div className="relative w-full pt-1">
          <div className="flex h-2 mb-4 mr-3 overflow-hidden text-xs bg-blue-200 rounded">
            <div
              style={{
                width: `${Math.round(
                  (differenceInDays(currentDateTime, new Date(semester.start)) /
                    differenceInDays(
                      new Date(semester.end),
                      new Date(semester.start)
                    ) +
                    Number.EPSILON) *
                    100
                )}%`
              }}
              className="flex flex-col justify-center text-center text-white bg-blue-500 shadow-none whitespace-nowrap"
            ></div>
          </div>
        </div>
        {/* <p>
          total semester days:{' '}
          {differenceInDays(new Date(semester.end), new Date(semester.start))}
        </p>
        <p>
          days from start of semester:{' '}
          {differenceInDays(currentDateTime, new Date(semester.start))}
        </p> */}
      </div>
      <div className="p-6 m-auto prose">
        <h2 className="flex items-baseline justify-between pb-2 m-0 font-serif text-gray-600">
          Others
        </h2>
        {countdown.Other.items &&
          countdown.Other.items.map((item) => (
            <div key={item.name} className="py-3">
              <TimeUntil currentDateTime={currentDateTime} item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;

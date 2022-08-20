import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { countdownProps } from 'types/types';
import { differenceInDays } from 'date-fns';
import DateList from '@/components/DateList';
import TimeUntil from '@/components/TimeUntil';
import Weather from '@/components/Weather';

const countdown = {
  Monday: {
    items: [
      { name: 'MKT 345', startTime: '08:30', endTime: '09:50' },
      { name: 'MKT 325', startTime: '10:05', endTime: '11:25' },
      { name: 'RUS 256', startTime: '13:15', endTime: '14:35' }
    ]
  },
  Tuesday: {
    items: [{ name: 'PSY 221', startTime: '01:15', endTime: '14:35' }]
  },
  Wednesday: {
    items: [
      { name: 'MKT 345', startTime: '08:30', endTime: '09:50' },
      { name: 'MKT 325', startTime: '10:05', endTime: '11:25' },
      { name: 'RUS 256', startTime: '13:15', endTime: '14:35' }
    ]
  },
  Thursday: {
    items: [{ name: 'PSY 221', startTime: '01:15', endTime: '14:35' }]
  },
  Friday: {
    items: []
  },
  Saturday: {},
  Sunday: {},
  Other: {
    items: [
      {
        name: 'Fall Semester 2022 Start',
        date: new Date(new Date().getFullYear(), 8 - 1, 22),
        startTime: '12:00:00'
      },
      {
        name: 'Exam week',
        date: new Date(2022, 12 - 1, 5),
        startTime: '19:00:00'
      },
      {
        name: 'Birthday',
        date: new Date(new Date().getFullYear(), 12 - 1, 9),
        startTime: '12:00:00'
      },
      {
        name: 'Grad',
        date: new Date(2023, 5 - 1, 13),
        startTime: '19:00:00'
      },
      {
        name: 'Birthday2',
        date: new Date(new Date().getFullYear(), 7 - 1, 7),
        startTime: '12:00:00'
      }
    ]
  }
} as countdownProps;

const Home: NextPage = () => {
  //   const currentDateTime = new Date();

  const semester = {
    start: '08/22/2022',
    end: '12/09/2022'
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

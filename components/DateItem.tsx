import {
  set,
  startOfWeek,
  addDays,
  formatDuration,
  intervalToDuration
} from 'date-fns';
import { ClockIcon } from '@heroicons/react/outline';
import { useState } from 'react';

const DateItem = ({
  currentDateTime,
  weekdayDate,
  item
}: {
  currentDateTime: Date;
  weekdayDate: Date;
  item: any;
}) => {
  const [showInterval, setShowInterval] = useState(false);

  const itemTime = {
    hours: Number(item.startTime.split(':')[0]),
    minutes: Number(item.startTime.split(':')[1])
  };
  const itemDate = set(weekdayDate, {
    hours: itemTime.hours,
    minutes: itemTime.minutes
  });

  const itemDuration = formatDuration(
    intervalToDuration({
      start: currentDateTime,
      end: itemDate
    }),
    {
      //   delimiter: ' ',
      format: ['months', 'weeks', 'days', 'hours', 'minutes']
    }
  );

  return (
    <div>
      {currentDateTime > itemDate ? (
        <div className="py-3">
          <p className="flex items-center m-0 font-bold text-gray-200">
            {item.name}{' '}
            <button
              type="button"
              onClick={() => setShowInterval(!showInterval)}
            >
              <ClockIcon className="w-5 h-5 ml-3 hover:text-blue-300" />
            </button>
            {showInterval && (
              <span className="ml-2 font-normal">
                {item.startTime} – {item?.endTime}
              </span>
            )}
          </p>
          <p className="m-0 text-gray-200">{itemDuration} ago</p>
        </div>
      ) : (
        <div className="py-3">
          <p className="flex items-center m-0 font-bold">
            {item.name}{' '}
            <button
              type="button"
              onClick={() => setShowInterval(!showInterval)}
            >
              <ClockIcon className="w-5 h-5 ml-3 text-gray-300 hover:text-blue-300" />
            </button>
            {showInterval && (
              <span className="ml-2 font-normal text-gray-300">
                {item.startTime} – {item?.endTime}
              </span>
            )}
          </p>
          <p className="m-0">{itemDuration}</p>
        </div>
      )}
    </div>
  );
};

export default DateItem;

import {
  set,
  startOfWeek,
  addDays,
  formatDuration,
  intervalToDuration
} from 'date-fns';

const DateItem = ({
  currentDateTime,
  weekdayDate,
  item
}: {
  currentDateTime: Date;
  weekdayDate: Date;
  item: any;
}) => {
  const itemTime = {
    hours: Number(item.time.split(':')[0]),
    minutes: Number(item.time.split(':')[1])
  };
  const itemDate = set(weekdayDate, {
    hours: itemTime.hours,
    minutes: itemTime.minutes
  });
  console.log(itemDate);

  console.log(currentDateTime > itemDate);
  {
    formatDuration(
      intervalToDuration({
        start: currentDateTime,
        end: itemDate
      }),
      {
        delimiter: ' ',
        format: ['hours', 'minutes']
      }
    );
  }

  const itemDuration = formatDuration(
    intervalToDuration({
      start: currentDateTime,
      end: itemDate
    }),
    {
      delimiter: ' ',
      format: ['hours', 'minutes']
    }
  );

  return (
    <div>
      {currentDateTime > itemDate ? (
        <div className="py-3">
          <p className="m-0 font-bold text-gray-200">{item.name}</p>
          <p className="m-0 text-gray-200">{itemDuration} ago</p>
        </div>
      ) : (
        <div className="py-3">
          <p className="m-0 font-bold">{item.name}</p>
          <p className="m-0">{itemDuration}</p>
        </div>
      )}
    </div>
  );
};

export default DateItem;

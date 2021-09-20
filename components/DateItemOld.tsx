import {
  differenceInDays,
  differenceInHours,
  formatDuration,
  intervalToDuration
} from 'date-fns';

const DateItemOld = ({
  name,
  time,
  loadDate,
  weekday
}: {
  name: string;
  time: any;
  loadDate: Date;
  weekday: Date;
}) => {
  const itemDate = new Date(`${loadDate.toISOString().split('T')[0]}T${time}`);
  const diff = itemDate.valueOf() - loadDate.valueOf();
  // const hoursDiff = Math.floor((diff % 86400000) / 3600000);
  const daysDiff = differenceInDays(loadDate, weekday);
  console.log('weekday');
  console.log(weekday);
  const hoursDiff = differenceInHours(loadDate, itemDate) + daysDiff;
  const minsDiff = Math.round(((diff % 86400000) % 3600000) / 60000);
  console.log('loadDate');
  console.log(loadDate);

  const duration = intervalToDuration({
    start: itemDate,
    end: weekday
  });

  console.log(
    formatDuration(duration, {
      delimiter: ' '
    })
  );

  // console.log('itemDate');
  // console.log(itemDate);

  return (
    <div className="my-4">
      <p className="m-0 font-bold">{name}</p>
      {/* <p className="m-0">{time}</p> */}
      <p>
        {formatDuration(duration, {
          delimiter: ' ',
          format: ['hours', 'minutes']
        })}
      </p>
      <p className="m-0">
        {hoursDiff} hours {minsDiff} minutes
      </p>
    </div>
  );
};

export default DateItemOld;

import { addYears, formatDuration, intervalToDuration, isPast } from 'date-fns';

const TimeUntil = ({
  currentDateTime,
  item
}: {
  currentDateTime: Date;
  item: { name: string; date?: Date };
}) => {
  if (item.date) {
    item.date = isPast(item.date) ? addYears(item.date, 1) : item.date;
  }

  const itemDuration = formatDuration(
    intervalToDuration({
      start: currentDateTime,
      end: item.date || new Date()
    }),
    {
      //   delimiter: ' ',
      format: ['years', 'months', 'weeks', 'days', 'hours', 'minutes']
    }
  );

  return (
    <div key={item.name}>
      <p className="flex items-center m-0 font-bold">{item.name}</p>
      <p className="m-0">{itemDuration}</p>
    </div>
  );
};

export default TimeUntil;

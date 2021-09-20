import DateItem from './DateItemOld';
import { startOfWeek, addDays } from 'date-fns';

const DateListOld = ({
  countdown,
  weekDay,
  loadDate
}: {
  countdown: any;
  weekDay?: string;
  loadDate: Date;
}) => {
  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const firstDayOfWeek = startOfWeek(loadDate, { weekStartsOn: 1 });

  if (weekDay) {
    const loadDateDayNumber = ('0' + loadDate.getDate()).slice(-2);
    const loadDateDayString = loadDate.toLocaleString('en-US', {
      weekday: 'long'
    });
    const loadDateMonthNumber = ('0' + (loadDate.getMonth() + 1)).slice(-2);
    return countdown[weekDay].items.map((item: any) => (
      <div key={item.name + item.time}>
        <p>
          <span className="font-bold text-blue-500">
            {loadDateDayNumber}.{loadDateMonthNumber}
          </span>
          <span className="ml-3 text-blue-400">{loadDateDayString}</span>
        </p>

        <div>
          <DateItem name={item.name} time={item.time} loadDate={loadDate} />
        </div>
      </div>
    ));
  } else {
    return weekDays.map((weekday, index) => {
      const weekdayDate = addDays(firstDayOfWeek, index);
      const weekdayDayNumber = ('0' + weekdayDate.getDate()).slice(-2);
      const weekdayDayString = weekdayDate.toLocaleString('en-US', {
        weekday: 'long'
      });
      const weekdayMonthNumber = ('0' + (weekdayDate.getMonth() + 1)).slice(-2);
      // console.log(weekdayDateDayNumber);
      // console.log('!!!');
      // console.log(addDays(firstDayOfWeek, index));
      // console.log('!!!');
      return (
        countdown[weekday]?.items && (
          <div key={weekday} className="pb-6">
            <p>
              <span className="font-bold text-blue-500">
                {weekdayDayNumber}.{weekdayMonthNumber}
              </span>
              <span className="ml-3 text-blue-400">{weekdayDayString}</span>
            </p>
            {countdown[weekday].items.map((item: any) => (
              <div key={item.name}>
                <DateItem
                  name={item.name}
                  time={item.time}
                  loadDate={loadDate}
                  weekday={weekdayDate}
                />
              </div>
            ))}
          </div>
        )
      );
    });
  }
};

export default DateListOld;

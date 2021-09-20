import { addDays, startOfWeek } from 'date-fns';
import DateItem from './DateItem';
import { Disclosure, Transition } from '@headlessui/react';

const DateList = ({
  countdown,
  dayView,
  currentDateTime
}: {
  countdown: any;
  dayView: 'week' | 'day';
  currentDateTime: Date;
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

  const currentWeekday = currentDateTime.toLocaleString('en-US', {
    weekday: 'long'
  });
  const firstDayOfWeek = startOfWeek(currentDateTime, { weekStartsOn: 1 });

  if (dayView === 'day') {
    const weekdayDate = currentDateTime;
    const weekdayDayNumber = ('0' + weekdayDate.getDate()).slice(-2);
    const weekdayDayString = weekdayDate.toLocaleString('en-US', {
      weekday: 'long'
    });
    const weekdayMonthNumber = ('0' + (weekdayDate.getMonth() + 1)).slice(-2);
    return (
      <div className="py-6">
        <p>
          <span className="font-bold text-blue-500">
            {weekdayDayNumber}.{weekdayMonthNumber}
          </span>
          <span className="ml-3 text-blue-400">{weekdayDayString}</span>
        </p>
        {countdown[weekdayDayString].items?.map((item: any) => (
          <div key={weekdayDayString + item.name}>
            <DateItem
              currentDateTime={currentDateTime}
              item={item}
              weekdayDate={weekdayDate}
            />
          </div>
        ))}
      </div>
    );
  }
  return (
    <>
      {weekDays.map((weekday, weekIndex) => {
        const weekdayDate = addDays(firstDayOfWeek, weekIndex);
        const weekdayDayNumber = ('0' + weekdayDate.getDate()).slice(-2);
        const weekdayDayString = weekdayDate.toLocaleString('en-US', {
          weekday: 'long'
        });
        const weekdayMonthNumber = ('0' + (weekdayDate.getMonth() + 1)).slice(
          -2
        );
        return (
          <div key={weekday}>
            {/* <p>
              <span className="font-bold text-blue-500">
                {weekdayMonthNumber}.{weekdayDayNumber}
              </span>
              <span className="ml-3 text-blue-400">{weekdayDayString}</span>
            </p>
            {countdown[weekday].items?.map((item: any) => (
              <div key={weekday + item.name}>
                <DateItem
                  currentDateTime={currentDateTime}
                  item={item}
                  weekdayDate={weekdayDate}
                />
              </div>
            ))} */}
            {currentDateTime.getDate() === weekdayDate.getDate() ? (
              <Disclosure defaultOpen={true}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full py-2 text-sm font-medium text-left text-purple-900 border-b border-white hover:border-gray-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <span className="font-bold text-blue-500">
                        {weekdayMonthNumber}.{weekdayDayNumber}
                      </span>
                      <span className="ml-3 text-blue-400">
                        {weekdayDayString}
                      </span>
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel>
                        {countdown[weekday].items?.map((item: any) => (
                          <div key={weekday + item.name}>
                            <DateItem
                              currentDateTime={currentDateTime}
                              item={item}
                              weekdayDate={weekdayDate}
                            />
                          </div>
                        ))}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ) : (
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full py-2 text-sm font-medium text-left text-purple-900 border-b border-white hover:border-gray-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <span className="font-bold text-blue-300">
                        {weekdayMonthNumber}.{weekdayDayNumber}
                      </span>
                      <span className="ml-3 text-blue-200">
                        {weekdayDayString}
                      </span>
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel>
                        {countdown[weekday].items?.map((item: any) => (
                          <div key={weekday + item.name}>
                            <DateItem
                              currentDateTime={currentDateTime}
                              item={item}
                              weekdayDate={weekdayDate}
                            />
                          </div>
                        ))}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            )}
          </div>
        );
      })}
    </>
  );
};

export default DateList;

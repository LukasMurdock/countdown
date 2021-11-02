import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Weather = () => {
  const { data, error } = useSWR('/api/weather', fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="p-4 rounded-lg bg-blue-50">
      {/* <p>dt: {data.current.dt}</p>
      <p>Sunrise: {data.current.sunrise}</p>
      <p>Sunset: {data.current.sunset}</p> */}
      <p className="m-0">
        <span className="text-2xl font-medium">{data.current.temp}°</span>{' '}
        <span>Feels {data.current.feels_like}°</span>{' '}
      </p>
      <p className="m-0">{data.current.weather[0].description}</p>
      <p className="m-0">
        <span>H:{data.daily[0].temp.max}°</span>{' '}
        <span>L:{data.daily[0].temp.min}°</span>
      </p>
    </div>
  );
};

export default Weather;

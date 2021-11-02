// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

type queryParamProps = {
  lat: number;
  lon: number;
  appId: string;
  units: string;
  exclude: string;
  [queryParams: string]: string | number;
};

const url = 'https://api.openweathermap.org/data/2.5/onecall';
const queryParams: queryParamProps = {
  lat: 39.507,
  lon: -84.7452,
  exclude: '',
  appId: '649e97722b26fd08e6226f3355ebed72',
  units: 'imperial'
};
const queryString =
  url +
  '?' +
  Object.keys(queryParams)
    .map((key) => key + '=' + queryParams[key])
    .join('&');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch(queryString);
  const data = await response.json();
  res.status(200).json(data);
}

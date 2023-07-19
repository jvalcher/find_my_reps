import { env } from './env.mjs';

export const fetchImg = async (query) => {
  const res = await fetch(`${env.HOST_SCRAPE}/${query}`);
  const img = await res.text();
  return img;
}

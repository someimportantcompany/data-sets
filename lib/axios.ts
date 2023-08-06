import axios from 'axios';
import ms from 'ms';

export const json = axios.create({
  headers: {
    'User-Agent': '@data-sets/axios (https://github.com/someimportantcompany/data-sets/blob/master/lib/axios.ts)'
  },
  responseType: 'json',
  timeout: ms('30s'),
  validateStatus: () => true,
});

export const web = axios.create({
  headers: {
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36', // eslint-disable-line max-len
  },
  responseType: 'json',
  timeout: ms('30s'),
  validateStatus: () => true,
});

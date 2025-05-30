import http from 'k6/http';
import type { Options } from 'k6/options';
import { check, group, type JSONObject } from 'k6';

export const options: Options = {
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 100 },
        { duration: '10s', target: 50 },
        { duration: '5s', target: 10 },
      ],
      gracefulRampDown: '0s',
    },
  },
};

const API_URL = __ENV.API_URL ?? 'http://server:3000';

export function setup() {
  const shortenUrlResponse = http.post(
    `${API_URL}/api/url`,
    JSON.stringify({ uri: 'https://example.com/' }),
    { headers: { 'Content-Type': 'application/json' } },
  );

  const sut = shortenUrlResponse.json() as JSONObject;

  check(shortenUrlResponse, {
    'URL shortened successfully': () => Boolean(sut?.uri),
  });

  return sut;
}

export default function (sut: JSONObject) {
  group('01. Should return the original URL', () => {
    const redirectionResponse = http.get(
      `${API_URL}/api/url/encoded/${sut.encodedUri}`,
    );

    check(redirectionResponse, {
      'Redirection status is 302': (r) => r.status === 302,
    });
  });
}

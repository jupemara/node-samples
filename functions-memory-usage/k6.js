import http from 'k6/http';

export const options = {
  stages: Array.from({ length: 10 }).map((v, i) => {
    return {
      duration: '5s',
      target: 3 * (i + 1),
    };
  }),
};

export default function () {
  http.get('http://localhost:3000');
}

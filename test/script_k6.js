import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // sube a 10 usuarios
    { duration: '1m', target: 10 },   // mantiene carga
    { duration: '10s', target: 0 },   // termina
  ],
};

export default function () {
  const BASE_URL = 'https://tyditglanavmupucjooo.supabase.co';

  // Endpoint de login
  const loginRes = http.get(`${BASE_URL}/login`);
  check(loginRes, {
    'login status 200': (r) => r.status === 200,
  });

  // Endpoint de registro
  const registerRes = http.get(`${BASE_URL}/register`);
  check(registerRes, {
    'register status 200': (r) => r.status === 200,
  });

  sleep(1);
}

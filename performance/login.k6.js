import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

// Custom metrics
const loginDuration = new Trend('login_duration');
const loginSuccess = new Rate('login_success_rate');

// Test configuration — controls load shape
export const options = {
    stages: [
        { duration: '30s', target: 10 },  // Ramp up to 10 users over 30s
        { duration: '1m',  target: 10 },  // Hold at 10 users for 1 minute
        { duration: '30s', target: 0  },  // Ramp down to 0
    ],
    thresholds: {
        // 95% of login requests must complete under 2 seconds
        login_duration: ['p(95)<2000'],
        // Login success rate must be above 99%
        login_success_rate: ['rate>0.99'],
        // Overall HTTP failure rate must be below 1%
        http_req_failed: ['rate<0.01'],
    },
};

const BASE_URL = 'https://www.saucedemo.com';

// This function runs once per virtual user iteration
export default function () {
    // Step 1: Load the login page
    const loginPage = http.get(`${BASE_URL}/`);

    check(loginPage, {
        'Login page loaded': (r) => r.status === 200,
    });

    // Step 2: Simulate form submission (POST request)
    const loginStart = Date.now();

    const loginResponse = http.post(`${BASE_URL}/`, {
        user_name: 'standard_user',
        password: 'secret_sauce',
    });

    const duration = Date.now() - loginStart;
    loginDuration.add(duration);

    const success = check(loginResponse, {
        'Login successful (status 200)': (r) => r.status === 200,
        'Redirected to inventory': (r) => r.url.includes('inventory'),
    });

    loginSuccess.add(success);

    // Simulate user think time between actions (1-3 seconds)
    sleep(Math.random() * 2 + 1);
}

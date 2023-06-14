const request = require('supertest');
const app = require('server/server.js'); 

describe('Get User Data', () => {
  it('should return the user data for an authenticated user', async () => {
    // Log in the user before retrieving data
    const loginRes = await request(app)
      .post('/auth')
      .set('idtoken', 'VALID_ID_TOKEN')
      .set('code', 'VALID_CODE'); // some valid token we will write later

    const { access_token } = loginRes.body;

    const res = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${access_token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('score');
    // Additional assertions for user data
  });

  it('should return an error for an unauthenticated user', async () => {
    const res = await request(app).get('/user');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
    // Additional assertions for error response
  });
});


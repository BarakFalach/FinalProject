const request = require('supertest');
const express = require('express');
const router = require('../routes/user');
const User = require('../db/models/User');
const { OAuth2Client } = require('google-auth-library');
const { getTodayStepCount } = require('../utils/googleFit');
const { initStepCountHistory } = require('../utils/StepCount');

jest.mock('../db/models/User');
jest.mock('google-auth-library');
jest.mock('../utils/googleFit');
jest.mock('../utils/StepCount');

const app = express();
app.use(express.json());
app.use('/users', router);

describe('User Routes', () => {
  let mockAccessToken = 'mockAccessToken';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /users', () => {
    it('should login a user and return user data', async () => {
      const mockIdToken = 'mockIdToken';
      const mockCode = 'mockCode';
      const mockUserData = {
        email: 'john@example.com',
        name: 'John Doe',
        picture: 'profile.jpg',
        todayStepCount: 1000,
        access_token: 'accessToken',
        refresh_token: 'refreshToken',
      };
      const mockSession = {
        email: mockUserData.email,
      };

      const mockUser = {
        save: jest.fn(),
        toJSON: jest.fn(() => mockUserData),
      };

      OAuth2Client.prototype.verifyIdToken.mockResolvedValueOnce({
        getPayload: jest.fn().mockResolvedValueOnce(mockUserData),
      });

      User.findOne.mockResolvedValueOnce(null);
      User.prototype.save.mockResolvedValueOnce(mockUser);

      const response = await request(app)
        .post('/users')
        .set('idtoken', mockIdToken)
        .set('code', mockCode);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUserData);
      expect(request.session).toEqual(mockSession);
      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(User.prototype.save).toHaveBeenCalledTimes(1);
    });

    it('should handle step count call error and return 413 status', async () => {
      const mockIdToken = 'mockIdToken';
      const mockCode = 'mockCode';

      OAuth2Client.prototype.verifyIdToken.mockRejectedValueOnce(
        'Error in stepCountCall'
      );

      const response = await request(app)
        .post('/users')
        .set('idtoken', mockIdToken)
        .set('code', mockCode);

      expect(response.status).toBe(413);
      expect(response.body).toEqual({ error: 'Error in stepCountCall' });
      expect(User.findOne).not.toHaveBeenCalled();
      expect(User.prototype.save).not.toHaveBeenCalled();
    });

    it('should handle login error and return 400 status', async () => {
      const mockIdToken = 'mockIdToken';
      const mockCode = 'mockCode';

      OAuth2Client.prototype.verifyIdToken.mockRejectedValueOnce(
        'Some login error'
      );

      const response = await request(app)
        .post('/users')
        .set('idtoken', mockIdToken)
        .set('code', mockCode);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Error in login' });
      expect(User.findOne).not.toHaveBeenCalled();
      expect(User.prototype.save).not.toHaveBeenCalled();
    });
  });

  describe('GET /users', () => {
    it('should get user data, update access token and step count, and return user data', async () => {
      const mockEmail = 'john@example.com

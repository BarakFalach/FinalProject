const request = require('supertest');
const app = require('server/server.js'); 
const User = require('server/db/models/User.js');


//Testing the /users/:id endpoint to get a specific user:
describe('GET /users/:id', () => {
  it('should return the user with the specified ID', async () => {
    const mockUser = {
      _id: 'mockUserId',
      email: 'test@example.com',
      name: 'test test',
      picture: 'profile.jpg',
      score: 100,
    };

    // Mock the User.findById() method to return the mock user
    User.findById.mockResolvedValueOnce(mockUser);

    // Send a GET request to the user endpoint with the req.session
    const response = await request(app).get('/user');

    // Expect the response to have a status code of 200 and the mock user
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it('should return a 404 error if the user is not found', async () => {
    // Mock the User.findById() method to return null, simulating a user not found
    User.findById.mockResolvedValueOnce(null);

    // Send a GET request to the user endpoint with a non-existent req.session
    const response = await request(app).get('/users');

    // Expect the response to have a status code of 404
    expect(response.status).toBe(404);
  });
});

describe('POST /users', () => {
  it('should create a new user and return the user object', async () => {
    const mockUser = {
      _id: 'mockUserId',
      email: 'test@example.com',
      name: 'test test',
      picture: 'profile.jpg',
      score: 100,
    };

    User.create.mockResolvedValueOnce(mockUser);

    const response = await request(app).post('/users').send(mockUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
  });

  it('should return a 400 error if the user data is invalid', async () => {
    const response = await request(app).post('/users').send({});

    expect(response.status).toBe(400);
  });
});

describe('PUT /users/score', () => {
  it('should update the score of the user with the specified email', async () => {
    const mockUser = {
      _id: 'mockUserId',
      email: 'test@example.com',
      name: 'test test',
      picture: 'profile.jpg',
      score: 100,
    };
    const updatedScore = 150;

    User.findOneAndUpdate.mockResolvedValueOnce(mockUser);

    // Send a PUT request to the user score endpoint with the updated score in the request body
    const response = await request(app).put('/users/score').send({ email: mockUser.email, score: updatedScore });

    // Expect the response to have a status code of 200
    expect(response.status).toBe(200);
    // Expect the response body to contain the updated user message
    expect(response.body).toBe('user updated');
  });

  it('should return a 400 error if the email or score is missing in the request body', async () => {
    // Send a PUT request to the user score endpoint with missing email and score fields
    const response = await request(app).put('/users/score').send({});

    // Expect the response to have a status code of 400
    expect(response.status).toBe(400);
  });

  it('should return a 404 error if the user is not found', async () => {
    // Mock the User.findOneAndUpdate() method to return null, simulating a user not found
    User.findOneAndUpdate.mockResolvedValueOnce(null);

    // Send a PUT request to the user score endpoint with a non-existent email
    const response = await request(app).put('/users/score').send({ email: 'nonexistent@example.com', score: 150 });

    // Expect the response to have a status code of 404
    expect(response.status).toBe(404);
  });
});

describe('GET /users/all', () => {
  it('should return all users', async () => {
    const mockUsers = [
      {
        _id: 'mockUserId',
        email: 'test@example.com',
        name: 'test test',
        picture: 'test1.jpg',
        score: 100,
      },
      {
        _id: 'mockUserId',
        email: 'test@example.com',
        name: 'test test',
        picture: 'test2.jpg',
        score: 200,
      }
    ];

    User.find.mockResolvedValueOnce(mockUsers);

    // Send a GET request to the user all endpoint
    const response = await request(app).get('/users/all');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });

  it('should return an empty array if there are no users', async () => {
    User.find.mockResolvedValueOnce([]);

    // Send a GET request to the user all endpoint
    const response = await request(app).get('/users/all');

    // Expect the response to have a status code of 200
    expect(response.status).toBe(200);
    // Expect the response body to be an empty array
    expect(response.body).toEqual([]);
  });
});

describe('DELETE /users/all', () => {
  it('should delete all users and return a success message', async () => {
    User.deleteMany.mockResolvedValueOnce();

    const response = await request(app).delete('/users/all');

    // Expect the response to have a status code of 200
    expect(response.status).toBe(200);
    // Expect the response body to contain the success message
    expect(response.body).toBe('deleted');
  });
});
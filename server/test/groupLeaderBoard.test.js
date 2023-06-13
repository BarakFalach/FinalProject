const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const { getGroupLeaderBoard } = require('../utils/leaderBoard');
const Group = require('server/db/models/Group.js');
const router = require('server/routes/group.js'); 
// Mock the Group model and getGroupLeaderBoard function
jest.mock('../db/models/Group');
jest.mock('../utils/leaderBoard');

// Create an Express app and use the router
const app = express();
app.use('/', router);

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

// Test suite for the GET /groups/leaderBoard/:name endpoint
describe('GET /groups/leaderBoard/:name', () => {
  it('should return the leaderBoard for a group', async () => {
    const mockGroup = {
      groupName: 'Group 1',
      groupMembers: ['Member 1', 'Member 2'],
    };
    const mockLeaderBoard = [
      { name: 'Member 1', score: 100 },
      { name: 'Member 2', score: 200 },
    ];

    // Mock the Group.findOne() to return the mock group
    Group.findOne.mockResolvedValueOnce(mockGroup);

    // Mock the getGroupLeaderBoard function to return the mock leaderBoard
    getGroupLeaderBoard.mockResolvedValueOnce(mockLeaderBoard);

    // Send a GET request to the endpoint
    const response = await request(app).get('/groups/leaderBoard/Group 1');

    // Expect the response to have a status code of 200 and the mock leaderBoard
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockLeaderBoard);
  });

  it('should handle error when retrieving the leaderBoard for a group', async () => {
    const errorMessage = 'Error retrieving leaderBoard';

    // Mock the Group.findOne() to throw an error
    Group.findOne.mockRejectedValueOnce(new Error(errorMessage));

    // Send a GET request to the endpoint
    const response = await request(app).get('/groups/leaderBoard/Group 1');

    // Expect the response to have a status code of 500 and the error message
    expect(response.status).toBe(500);
    expect(response.text).toBe(errorMessage);
  });
});

// Test suite for the DELETE /groups endpoint
describe('DELETE /groups', () => {
  it('should delete all groups', async () => {
    // Send a DELETE request to the endpoint
    const response = await request(app).delete('/groups');

    // Expect the response to have a status code of 200 and the "deleted" message
    expect(response.status).toBe(200);
    expect(response.text).toBe('deleted');

    // Expect the Group.deleteMany() method to have been called
    expect(Group.deleteMany).toHaveBeenCalled();
  });
});

// Test suite for the GET /groups/deleteMembers/:name endpoint
describe('GET /groups/deleteMembers/:name', () => {
  it('should delete group members', async () => {
    const groupName = 'Group 1';

    // Send a GET request to the endpoint
    const response = await request(app).get(`/groups/deleteMembers/${groupName}`);

    // Expect the response to have a status code of 200 and the "deleted" message
    expect(response.status).toBe(200);
    expect(response.text).toBe('deleted');

    // Expect the Group.findOneAndUpdate() method to have been called with the expected parameters
    expect(Group.findOneAndUpdate).toHaveBeenCalledWith(
      { groupName },
      { groupMembers: [] }
    );
  });
});

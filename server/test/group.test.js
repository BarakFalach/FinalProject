const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const Group = require('server/db/models/Group.js');
const router = require('server/routes/group.js'); 

// Mock the Group model
jest.mock('server/db/models/Group.js');

// Create an Express app and use the router
const app = express();
app.use('/', router);

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

// Test suite for the GET /groups endpoint
describe('GET /groups', () => {
  it('should return all groups', async () => {
    const mockGroups = [
      {
          id: "643704cd7fb171d70e3e3486",
          groupName: "Debug",
          groupCode: "7371",
          groupMembers: [
              "barak8995@gmail.com",
              "naorserf@gmail.com",
              "avichi2@gmail.com"
          ],
          dateCreated: "2023-04-12T19:21:49.134Z",
          __v: 5
      },
      {
          id: "64443f55c274766c5b7b3806",
          groupName: "Production",
          groupCode: "7825",
          groupMembers: [
              "yuliadrob@gmail.com",
              "tamar933@gmail.com",
              "orielbar@gmail.com"
          ],
          dateCreated: "2023-04-22T20:11:01.222Z",
          __v: 0
      },
      {
          id: "6469fd2c6fc007e50d62880d",
          groupName: "Pizza",
          groupCode: "8932",
          groupMembers: [
              "shirmazor18@gmail.com",
              "mikework100@gmail.com",
              "maoritoml16@gmail.com",
              "nadavxsharon@gmail.com",
              "nadavgoo@gmail.com",
              "yarinbenaharon123@gmail.com",
              "avielmda@gmail.com",
              "dimalabada@gmail.com",
              "annmochalov1994@gmail.com",
              "gampadutz@gmail.com",
              "titooshm@gmail.com"
          ],
          dateCreated: "2023-05-21T11:14:52.379Z",
          __v: 0
      },
      {
          id: "646bbfb86fc007e50d628937",
          groupName: "ztiporim",
          groupCode: "8181",
          groupMembers: [
              "roimadmon@gmail.com",
              "liorc1996@gmail.com",
              "vardit.arkash@gmail.com",
              "hila300052@gmail.com"
          ],
          dateCreated: "2023-05-22T19:17:12.723Z",
          __v: 0
      },
      {
          id: "646e2e116fc007e50d628c6d",
          groupName: "bgu 2019",
          groupCode: "9911",
          groupMembers: [
              "ronny54@gmail.com",
              "dolevdr95@gmail.com",
              "liad123456789@gmail.com",
              "tomeraizikovich@gmail.com",
              "tomrob@post.bgu.ac.il"
          ],
          dateCreated: "2023-05-24T15:32:33.123Z",
          __v: 0
      }
  ];
    Group.find.mockResolvedValueOnce(mockGroups);

    const response = await request(app).get('/groups');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockGroups);
  });

  it('should handle error when retrieving groups', async () => {
    const errorMessage = 'Error retrieving groups';
    Group.find.mockRejectedValueOnce(new Error(errorMessage));

    const response = await request(app).get('/groups');

    expect(response.status).toBe(500);
    expect(response.text).toBe(errorMessage);
  });
});

// Test suite for the POST /groups endpoint
describe('POST /groups', () => {
  it('should create a new group', async () => {
    Group.findOne.mockResolvedValueOnce(null);
    const mockGroup = { groupName: 'Test Group' };
    Group.prototype.save.mockResolvedValueOnce(mockGroup);

    const response = await request(app).post('/groups').send(mockGroup);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockGroup);
  });

  it('should handle error when creating a group that already exists', async () => {
    const mockGroup = { groupName: 'Existing Group' };
    Group.findOne.mockResolvedValueOnce(mockGroup);

    const response = await request(app).post('/groups').send(mockGroup);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Group already exists');
  });

  it('should handle error when saving a new group', async () => {
    Group.findOne.mockResolvedValueOnce(null);
    const mockGroup = { groupName: 'New Group' };
    const errorMessage = 'Error saving group';
    Group.prototype.save.mockRejectedValueOnce(new Error(errorMessage));

    const response = await request(app).post('/groups').send(mockGroup);

    expect(response.status).toBe(500);
    expect(response.text).toBe(errorMessage);
  });
});

describe('GET /groups/code/:groupCode', () => {
  it('should get group details by groupCode', async () => {
    const group = new Group({
      groupName: 'TestGroup',
      groupCode: 'ABC123',
      groupMembers: ['user1', 'user2'],
    });
    await group.save();

    const res = await request(app).get('/groups/code/ABC123');

    expect(res.statusCode).toBe(200);
    expect(res.body.groupName).toBe('TestGroup');
    expect(res.body.groupCode).toBe('ABC123');
    expect(res.body.groupMembers).toEqual(['user1', 'user2']);
    expect(res.body.leaderBoard).toBeDefined();
  });

  it('should return 404 if groupCode is not found', async () => {
    const res = await request(app).get('/groups/code/NonexistentCode');

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Group not found');
  });
});

it('should delete all members of a group', async () => {
  // Create a group with members
  const group = new Group({
    groupName: 'TestGroup',
    groupCode: '1234',
    groupMembers: ['user1', 'user2', 'user3'],
  });
  await group.save();

  // Make a request to delete the members
  const res = await request(app).get('/groups/deleteMembers/Test Group');

  expect(res.statusCode).toBe(200);
  expect(res.text).toBe('deleted');

  // Check if the group members have been deleted
  const updatedGroup = await Group.findOne({ groupName: 'Test Group' });
  expect(updatedGroup.groupMembers.length).toBe(0);
});

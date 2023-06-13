const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Group = require('../models/Group');
const User = require('../models/User');

// Connect to a test database before running the tests
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clean up the database after running the tests
afterAll(async () => {
  await Group.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('Group Leaderboard Endpoint', () => {
  it('should get group leaderboard by groupName', async () => {
    // Create a group
    const group = new Group({
      groupName: 'TestGroup',
      groupCode: '1234',
      groupMembers: [],
    });
    await group.save();

    // Create users with different scores
    const user1 = new User({
      name: 'User1',
      score: 10,
      groupCode: '1234',
    });
    await user1.save();

    const user2 = new User({
      name: 'User2',
      score: 5,
      groupCode: '1234',
    });
    await user2.save();

    const user3 = new User({
      name: 'User3',
      score: 15,
      groupCode: '1234',
    });
    await user3.save();

    // Make a request to the endpoint
    const res = await request(app).get('/groups/leaderBoard/TestGroup');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBe(3);

    // Check the leaderboard order
    expect(res.body[0].name).toBe('User3');
    expect(res.body[0].score).toBe(15);

    expect(res.body[1].name).toBe('User1');
    expect(res.body[1].score).toBe(10);

    expect(res.body[2].name).toBe('User2');
    expect(res.body[2].score).toBe(5);
  });

  it('should return 404 if groupName is not found', async () => {
    const res = await request(app).get('/groups/leaderBoard/NonexistentGroup');

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Group not found');
  });
});

describe('Add User to Group Endpoint', () => {
  it('should add a user to the group and update groupMembers field in the user entity', async () => {
    // Create a group
    const group = new Group({
      groupName: 'TestGroup',
      groupCode: '1234',
      groupMembers: ['user1', 'user2'],
    });
    await group.save();

    // Create a user
    const user = new User({
      email: 'user3@example.com',
      access_token: 'ACCESS_TOKEN',
      refresh_token: 'REFRESH_TOKEN',
      name: 'User3',
      picture: 'user3.jpg',
      score: 0,
      todayStepCount: 0,
      groupCode: '',
    });
    await user.save();

    // Make a request to add the user to the group
    const res = await request(app)
      .post('/groups/addGroup')
      .send({ groupCode: '1234', email: 'user3@example.com' });

    expect(res.statusCode).toBe(200);
    expect(res.body.groupName).toBe('TestGroup');
    expect(res.body.groupCode).toBe('1234');
    expect(res.body.groupMembers).toEqual(['user1', 'user2', 'user3']);

    // Check if the user's groupCode field has been updated
    const updatedUser = await User.findOne({ email: 'user3@example.com' });
    expect(updatedUser.groupCode).toBe('1234');
  });

  it('should avoid adding a user to the group if they are already in a group', async () => {
    // Create a group
    const group = new Group({
      groupName: 'TestGroup',
      groupCode: '1234',
      groupMembers: ['user1', 'user2'],
    });
    await group.save();

    // Create a user already in a group
    const user = new User({
      email: 'user3@example.com',
      access_token: 'ACCESS_TOKEN',
      refresh_token: 'REFRESH_TOKEN',
      name: 'User3',
      picture: 'user3.jpg',
      score: 0,
      todayStepCount: 0,
      groupCode: 'OTHERGROUP',
    });
    await user.save();

    // Make a request to add the user to the group
    const res = await request(app)
      .post('/groups/addGroup')
      .send({ groupCode: '1234', email: 'user3@example.com' });

    expect(res.statusCode).toBe(200);
    expect(res.body.groupName).toBe('TestGroup');
    expect(res.body.groupCode).toBe('1234');
    expect(res.body.groupMembers).toEqual(['user1', 'user2']);

    // Check if the user's groupCode field has not been updated
    const updatedUser = await User.findOne({ email: 'user3@example.com' });
    expect(updatedUser.groupCode).toBe('OTHERGROUP');
  });

  it('should return 400 if the group does not exist', async () => {
    // Create a user
    const user = new User({
      email: 'user1@example.com',
      access_token: 'ACCESS_TOKEN',
      refresh_token: 'REFRESH_TOKEN',
      name: 'User1',
      picture: 'user1.jpg',
      score: 0,
      todayStepCount: 0,
      groupCode: '',
    });
    await user.save();

    // Make a request to add the user to a non-existent group
    const res = await request(app)
      .post('/groups/addGroup')
      .send({ groupCode: 'NONEXISTENT', email: 'user1@example.com' });

    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('group does not exist');
  });
});

describe('Delete Group from User Endpoint', () => {
  it('should delete the group from the user', async () => {
    // Create a user with a groupCode
    const user = new User({
      email: 'user1@example.com',
      access_token: 'ACCESS_TOKEN',
      refresh_token: 'REFRESH_TOKEN',
      name: 'User1',
      picture: 'user1.jpg',
      score: 0,
      todayStepCount: 0,
      groupCode: '1234',
    });
    await user.save();

    // Make a request to delete the group from the user
    const res = await request(app)
      .put('/groups/deleteGroup')
      .send({ email: 'user1@example.com' });

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('group has been deleted');

    // Check if the user's groupCode field has been set to null
    const updatedUser = await User.findOne({ email: 'user1@example.com' });
    expect(updatedUser.groupCode).toBeNull();
  });

  it('should return 200 even if the user is not in a group', async () => {
    // Create a user not in a group
    const user = new User({
      email: 'user2@example.com',
      access_token: 'ACCESS_TOKEN',
      refresh_token: 'REFRESH_TOKEN',
      name: 'User2',
      picture: 'user2.jpg',
      score: 0,
      todayStepCount: 0,
      groupCode: null,
    });
    await user.save();

    // Make a request to delete the group from the user
    const res = await request(app)
      .put('/groups/deleteGroup')
      .send({ email: 'user2@example.com' });

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('group has been deleted');

    // Check if the user's groupCode field remains null
    const updatedUser = await User.findOne({ email: 'user2@example.com' });
    expect(updatedUser.groupCode).toBeNull();
  });
});
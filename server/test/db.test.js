const mongoose = require('mongoose');
const connectDb = require('./server/db/db.js');

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('connectDb', () => {
  beforeAll(() => {
    process.env.DB_URL = "mongodb+srv://barak8995:drX1MbNhxa1HJ2BP@cluster0.mzkdydf.mongodb.net/?";
  });

  afterAll(() => {
    delete process.env.DB_URL;
  });

  it('should connect to the database', async () => {
    await connectDb();
    expect(mongoose.connect).toHaveBeenCalledWith("mongodb+srv://barak8995:drX1MbNhxa1HJ2BP@cluster0.mzkdydf.mongodb.net/?");
  });

  it('should return the connection object on successful connection', async () => {
    const connection = await connectDb();
    expect(connection).toBeDefined();
  });

  it('should log an error on connection failure', async () => {
    const error = new Error('Database connection failed');
    mongoose.connect.mockRejectedValueOnce(error);

    const consoleSpy = jest.spyOn(console, 'log');
    await connectDb();

    expect(consoleSpy).toHaveBeenCalledWith(error);
    consoleSpy.mockRestore();
  });
});

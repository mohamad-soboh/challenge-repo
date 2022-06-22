// import mongoose,{ConnectOptions} from "mongoose";
// import app from "../../server";

const app = require("../../backEnd/server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);

const mongoose = require("mongoose");
const databaseName = "mongodb+srv://admin:admin@cluster0.qhek7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";





describe('app running',()=>{
  beforeAll(async () => {
    const url = databaseName;
    await mongoose.connect(url, { useNewUrlParser: true });
  });
  
  it("Gets the test endpoint", async () => {
    // Sends GET Request to /test endpoint
    const result = await request.get("/");
    expect(result.text).toEqual("server is running");
    expect(result.status).toBe(200);
  });

})
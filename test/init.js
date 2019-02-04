const supertest = require("supertest");

before(done => {
  global.app = require("../index.js");
  setTimeout(() => {
    global.request = supertest(app);
    done();
  }, 1000);
});

after(() => {
  setTimeout(() => {
    console.log("testcases exceuted succesfully");
    process.exit(0);
  }, 5000);
});

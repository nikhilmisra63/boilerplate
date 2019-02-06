const data = {
  customername: "nik636",
  firstName: "Nikhil",
  lastName: "Mishra",
  email: "nikhilmisra63@gmail.com",
  Age: 24,
  Address: "LKO",
  phone_number: 8931097382
};

describe("CUSTOMER", () => {
  it("it should post customer", async () => {
    const res = await request
      .post("/Customers")
      .send(data)
      .expect(200);
    data.customerId = res.body.id;
    console.log("asdfghjk");
  });

  it("Should be able to list all records", async () => {
    const res = await request
      .get("/Customers")
      .set("Accept", "application/json")
      .expect(200);
  });
  it("Should be able to update records by id", async () => {
    const res = await request
      .put("/Customers/1")
      .send(data)
      .expect(200);
  });
  it("Should be able to list records by ID", async () => {
    const res = await request
      .get("/Customers/1")
      .set("Accept", "application/json")
      .expect(200);
  });
  it("Should be able to delete records", async () => {
    const res = await request.delete("/Customers/1").expect(200);
  });
  it("Should be able to find all customer with pets", async () => {
    const res = await request.get("/Customers/Pets").expect(200);
  });
  it("Should be able to find customer by id with its pets", async () => {
    const res = await request.get("/Customers/Pets/1").expect(200);
  });
  it("Should be able to list all customer by name", async () => {
    await request.get("/Customers/Name").expect(200);
  });
  it("Should be able to delete customer by name", async () => {
    await request.get("/Customers/Name/").expect(200);
  });
  it("Should be able to update customer by name", async () => {
    await request
      .get("/Customers/Name/")
      .send(data)
      .expect(200);
  });
});

//token test

// describe('encodeToken()', () => {
//   it('should return a token', (done) => {
//     const results = localAuth.encodeToken({id: 1});
//     should.exist(results);
//     results.should.be.a('string');
//     done();
//   });
// });

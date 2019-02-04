const data = {
  username: "nik",
  firstName: "Nikhil",
  lastName: "Mishra",
  email: "nikhilmisra63@gmail.com",
  Age: 24,
  Address: "LKO",
  phone_number: 8931097382
};

describe("USER", () => {
  before(async () => {
    const res = await request
      .post("/Users")
      .send(data)
      .expect(200);
    data.userId = res.body.id;
  });

  it("Should be able to list all records", async () => {
    const res = await request
      .get("/Users")
      .set("Accept", "application/json")
      .expect(200);
  });
  it("Should be able to update records by id", async () => {
    const res = await request
      .put("/Users/1")
      .send(data)
      .expect(200);
  });
  it("Should be able to list records by ID", async () => {
    const res = await request
      .get("/Users/1")
      .set("Accept", "application/json")
      .expect(200);
  });
  it("Should be able to delete records", async () => {
    const res = await request.delete("/Users/1").expect(200);
  });
  it("Should be able to find all user with pets", async () => {
    const res = await request.get("/Users/Pets").expect(200);
  });
  it("Should be able to find user by id with its pets", async () => {
    const res = await request.get("/Users/Pets/1").expect(200);
  });
  it("Should be able to list all user by name", async () => {
    await request.get("/Pets/Name/cat").expect(200);
  });
  it("Should be able to delete user by name", async () => {
    await request.get("/Pets/Name/cat").expect(200);
  });
  it("Should be able to update user by name", async () => {
    await request
      .get("/Pets/Name/cat")
      .send(data)
      .expect(200);
  });
});

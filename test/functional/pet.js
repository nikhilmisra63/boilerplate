const data = {
  customername: "nik",
  firstName: "Nikhil",
  lastName: "Mishra",
  email: "nikhilmisra63@gmail.com",
  Age: 24,
  Address: "LKO",
  phone_number: 8931097382
};

let customerId;

describe("PET", () => {
  before(async () => {
    const res = await request.post("/Customers").send(data);
    customerId = res.body.id;
    data.customerId = customerId;
  });

  const data = {
    name: "cat",
    color: "black",
    customerId
  };
  it("Should be able to create a pet", async () => {
    const res = await request
      .post("/Pets")
      .send(data)
      .expect(200);
  });
  it("Should be able to list all pets", async () => {
    const res = await request
      .get("/Pets")
      .set("Accept", "application/json")
      .expect(200);
  });
  it("Should be able to update pet by id", async () => {
    const res = await request
      .put("/Pets/1")
      .send(data)
      .expect(200);
  });
  it("Should be able to list Pet by ID", async () => {
    const res = await request
      .get("/Pets/1")
      .set("Accept", "application/json")
      .expect(200);
  });
  it("Should be able to delete Pet By ID", async () => {
    const res = await request.delete("/Pets/1").expect(200);
  });
  it("Should be able to find all Pets with customer", async () => {
    const res = await request.get("/Pets/customer").expect(200);
  });
  it("Should be able to find Pets by id with its customer", async () => {
    const res = await request.get("/Pets/customer/1").expect(200);
  });
  it("Should be able to list all pet by name", async () => {
    await request.get("/Pets/Name/cat").expect(200);
  });
  it("Should be able to delete pet by name", async () => {
    await request.get("/Pets/Name/cat").expect(200);
  });
  it("Should be able to update pet by name", async () => {
    await request
      .get("/Pets/Name/cat")
      .send(data)
      .expect(200);
  });
});

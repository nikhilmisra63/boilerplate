const userFacade = require("./facade");

class UserController {
  // create user
  async create(req, res, next) {
    const {
      username,
      firstName,
      lastName,
      email,
      age,
      address,
      phone_number
    } = req.body;
    let user;
    try {
      user = await userFacade.create({
        username,
        firstName,
        lastName,
        email,
        age,
        address,
        phone_number
      });
    } catch (e) {
      return next(e);
    }
    res.send(user);
  }
  //update user
  async Update(req, res, next) {
    const {
      username,
      firstName,
      lastName,
      email,
      age,
      address,
      phone_number
    } = req.body;
    let updatedUser;
    try {
      updatedUser = await userFacade.Update(
        { username, firstName, lastName, email, age, address, phone_number },
        {
          where: {
            id: req.params.id
          }
        }
      );
    } catch (e) {
      return next(e);
    }
    res.send(updatedUser);
  }
  //find all
  async findAllUser(req, res, next) {
    let showUser;
    try {
      showUser = await userFacade.findAll();
    } catch (e) {
      return next(e);
    }
    res.send(showUser);
  }
  //delete by id
  async destroy(req, res, next) {
    let d;
    try {
      await userFacade.destroy({
        where: { id: req.params.id }
      });
    } catch (e) {
      console.log(e);
      return next(e);
    }
    res.end();
  }

  // show records by ID
  async findById(req, res, next) {
    const id = req.params.id;
    let findId;
    try {
      findId = await userFacade.findById(id);
    } catch (e) {
      return next(e);
    }
    res.send(findId);
  }
  // show records by UserName
  async findByUserName(req, res, next) {
    let findUserName;
    try {
      findUserName = await userFacade.findByUserName({
        where: {
          username: req.params.username
        }
      });
    } catch (e) {
      return next(e);
    }
    res.send(findUserName);
  }
  //update by username
  async updateByUserName(req, res, next) {
    const {
      username,
      firstName,
      lastName,
      email,
      age,
      address,
      phone_number
    } = req.body;
    let updatedUser;
    try {
      updatedUser = await userFacade.updateByUserName(
        { username, firstName, lastName, email, age, address, phone_number },
        {
          where: {
            username: req.params.username
          }
        }
      );
    } catch (e) {
      return next(e);
    }
    res.send(updatedUser);
  }
  // DELETE USER BY USERNAME
  async deleteByUserName(req, res, next) {
    try {
      await userFacade.deleteByUserName({
        where: { username: req.params.username }
      });
    } catch (e) {
      console.log(e);
      return next(e);
    }
    res.send("deleted");
  }

  //find all with pets
  async findAllWithPets(req, res, next) {
    let users;
    const { id } = req.params;
    try {
      users = await userFacade.findAllWithPets({
        where: {},
        include: ["pets"]
      });
    } catch (e) {
      return next(e);
    }
    res.send(users);
  }
  //find User With Pets BY ID
  async findOneWithPets(req, res, next) {
    let user;
    const { id } = req.params;
    try {
      user = await userFacade.findOneWithPets({
        where: { id },
        include: ["pets"]
      });
    } catch (e) {
      return next(e);
    }
    res.send(user);
  }
}

module.exports = new UserController(userFacade);

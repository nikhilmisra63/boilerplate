const petFacade = require("./facade");

class PetController {
  //CREATE PET
  async create(req, res, next) {
    const { name, color, customerId } = req.body;
    let Pet;
    try {
      Pet = await petFacade.create({
        name,
        color,
        customerId
      });
    } catch (e) {
      return next(e);
    }
    res.send(Pet);
  }
  // UPDATE BY ID
  async Update(req, res, next) {
    const { name, color } = req.body;
    try {
      await petFacade.Update(
        { name, color },
        {
          where: {
            id: req.params.id
          }
        }
      );
    } catch (e) {
      return next(e);
    }
    res.send("Pet Updated");
  }
  //FIND ALL PETS
  async findAll(req, res, next) {
    let showPets;
    try {
      showPets = await petFacade.findAll();
    } catch (e) {
      return next(e);
    }
    res.send(showPets);
  }

  //DELETE BY ID
  async destroy(req, res, next) {
    try {
      await petFacade.destroy({
        where: { id: req.params.id }
      });
    } catch (e) {
      return next(e);
    }
    res.end("Pet Deleted");
  }

  // SHOW PETS BY ID
  async findById(req, res, next) {
    const id = req.params.id;
    let Pet;
    try {
      Pet = await petFacade.findById(id);
    } catch (e) {
      return next(e);
    }
    res.send(Pet);
  }
  // SHOW PETS BY NAME
  async findByName(req, res, next) {
    let findPetName;
    try {
      findPetName = await petFacade.findByName({
        where: { name: req.params.name }
      });
    } catch (e) {
      return next(e);
    }
    res.send(findPetName);
  }
  // DELETE PETS BY NAME
  async deleteByName(req, res, next) {
    try {
      await petFacade.deleteByName({
        where: { name: req.params.name }
      });
    } catch (e) {
      return next(e);
    }
    res.end("Deleted");
  }
  // UDATE BY NAME
  async updateByPetName(req, res, next) {
    const { name, color } = req.body;
    try {
      await petFacade.updateByPetName(
        { name, color },
        {
          where: { name: req.params.name }
        }
      );
    } catch (e) {
      return next(e);
    }
    res.send("Pet Updated");
  }
  // find all pets with customer
  async findAllWithCustomer(req, res, next) {
    let pets;
    try {
      pets = await petFacade.findAllWithCustomer({
        where: {},
        include: ["customer"]
      });
    } catch (e) {
      return next(e);
    }
    res.send(pets);
  }
  //find  Pets with Customer BY ID
  async findOneWithCustomer(req, res, next) {
    let pet;
    const { id } = req.params;
    try {
      pet = await petFacade.findOneWithCustomer({
        where: { id },
        include: ["customer"]
      });
    } catch (e) {
      return next(e);
    }
    res.send(pet);
  }
}

module.exports = new PetController(petFacade);

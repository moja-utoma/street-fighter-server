import { BaseRepository } from "./baseRepository.js";

class FighterRepository extends BaseRepository {
  constructor() {
    super("fighters");
  }

  checkUniqueName(name) {
    return this.dbContext.find({ name: { $iLike: name } }).value();
  }

  create(data) {
    const existingFighter = this.checkUniqueName(data.name);
    if (existingFighter) {
      throw new Error("Fighter name is already taken");
    }

    return super.create(data);
  }

  update(id, dataToUpdate) {
    if (dataToUpdate.name) {
      const existingFighter = this.checkUniqueName(dataToUpdate.name);
      if (existingFighter && existingFighter.id !== id) {
        throw new Error("Fighter name is already taken");
      }
    }

    return super.update(id, dataToUpdate);
  }
}

const fighterRepository = new FighterRepository();

export { fighterRepository };

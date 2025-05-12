import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAll() {
    return fighterRepository.getAll();
  }

  getById(id) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) {
      throw new Error("Fighter not found");
    }
    return fighter;
  }

  search(search) {
    return fighterRepository.getOne(search) || null;
  }

  create(data) {
    return fighterRepository.create(data);
  }

  update(id, updateData) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) {
      throw new Error("Fighter not found");
    }
    return fighterRepository.update(id, updateData);
  }

  delete(id) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) {
      throw new Error("Fighter not found");
    }
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };

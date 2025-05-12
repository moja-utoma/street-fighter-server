import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAll() {
    return userRepository.getAll();
  }

  getById(id) {
    const user = userRepository.getOne({ id });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  create(data) {
    return userRepository.create(data);
  }

  update(id, updateData) {
    const user = userRepository.getOne({ id });
    if (!user) {
      throw new Error("User not found");
    }
    return userRepository.update(id, updateData);
  }

  delete(id) {
    const user = userRepository.getOne({ id });
    if (!user) {
      throw new Error("User not found");
    }
    return userRepository.delete(id);
  }
}

const userService = new UserService();

export { userService };

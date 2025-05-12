import { BaseRepository } from "./baseRepository.js";

class UserRepository extends BaseRepository {
  constructor() {
    super("users");
  }

  checkUniqueEmail(email) {
    return this.dbContext.find({ email }).value();
  }

  checkUniquePhone(phone) {
    return this.dbContext.find({ phone }).value();
  }

  create(data) {
    const existingUserByEmail = this.checkUniqueEmail(data.email);
    if (existingUserByEmail) {
      throw new Error("Email is already taken");
    }

    const existingUserByPhone = this.checkUniquePhone(data.phone);
    if (existingUserByPhone) {
      throw new Error("Phone number is already taken");
    }

    return super.create(data);
  }

  update(id, dataToUpdate) {
    if (dataToUpdate.email) {
      const existingUserByEmail = this.checkUniqueEmail(dataToUpdate.email);
      if (existingUserByEmail && existingUserByEmail.id !== id) {
        throw new Error("Email is already taken");
      }
    }

    if (dataToUpdate.phone) {
      const existingUserByPhone = this.checkUniquePhone(dataToUpdate.phone);
      if (existingUserByPhone && existingUserByPhone.id !== id) {
        throw new Error("Phone number is already taken");
      }
    }

    return super.update(id, dataToUpdate);
  }
}

const userRepository = new UserRepository();

export { userRepository };

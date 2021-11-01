import { v4 as uuidV4 } from "uuid";

import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, {
      id: uuidV4(),
      name,
      admin: false,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return undefined;
    }

    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return undefined;
    }

    return user;
  }

  turnAdmin(receivedUser: User): User {
    const newUser = receivedUser;
    newUser.updated_at = new Date();
    newUser.admin = true;

    const newUsers = this.users.filter((user) => user.id !== newUser.id);

    this.users = [...newUsers, newUser];

    return newUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };

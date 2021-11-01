import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private usersRepository: IUsersRepository) { }

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User with this id does not exists.");
    }

    const newUser = this.usersRepository.turnAdmin(user);

    return newUser;
  }
}

export { TurnUserAdminUseCase };

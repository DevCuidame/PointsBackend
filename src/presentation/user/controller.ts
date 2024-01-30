import { UpdateUserDto } from "./../../domain/dtos/user/update-user.dto";
import {
  CreateUser,
  CustomError,
  UpdateUser,
  UserDto,
  UserRepository,
} from "../../domain";
import { Response, Request } from "express";
import { UserModel } from "../../data/mongodb";
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error); // Winston

    return res.status(500).json({ error: "Internal Server Error" });
  };

  createUser = (req: Request, res: Response) => {
    const [error, userDto] = UserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateUser(this.userRepository)
      .execute(userDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  updateUser = (req: Request, res: Response) => {
    // console.log(req.body);
    const [error, updateUserDto] = UpdateUserDto.update(req.body);
    if (error) return res.status(400).json({ error });

    new UpdateUser(this.userRepository)
      .execute(updateUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await UserModel.findById(id).exec();

      if (!user) {
        return res.status(404).json({ message: "Error al obtener usuario" });
      }

      // const access = await AccessModel.findOne({ userId: id }).select('-_id -password').exec();


      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
  
}

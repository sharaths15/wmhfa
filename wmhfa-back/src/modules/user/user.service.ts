import bcrypt from 'bcrypt';
import { UserModel } from './user.model';
import { RegisterUserInput } from './user.schema';

const SALT_ROUNDS = 10;

export async function createUser(input: RegisterUserInput) {
  const { password, ...rest } = input;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await UserModel.create({ ...rest, password: hashedPassword });

  return user.toObject();
}

export async function findUserByEmail(email: string) {
  return UserModel.findOne({ email }).lean();
}

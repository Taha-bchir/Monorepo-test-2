import type { UserRepository } from "../repositories/UserRepository.js";
import bcrypt from "bcryptjs";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.userRepository.create({ email, password: hashed });
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
    return user;
  }
}

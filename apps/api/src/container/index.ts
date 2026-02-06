import { prisma } from "@repo/database";
import { UserRepository } from "./repositories/UserRepository.js";
import { AuthService } from "./services/AuthService.js";

export function createContainer() {
  // Repositories
  const userRepository = new UserRepository(prisma);

  // Services
  const authService = new AuthService(userRepository);

  return {
    prisma,
    userRepository,
    authService,
  };
}

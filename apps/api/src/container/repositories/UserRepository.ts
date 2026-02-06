type PrismaClient = typeof import("@repo/database").prisma;

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: { email: string; password: string }) {
    return this.prisma.user.create({ data });
  }
}

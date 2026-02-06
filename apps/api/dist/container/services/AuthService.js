import bcrypt from "bcryptjs";
export class AuthService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async register(email, password) {
        const hashed = await bcrypt.hash(password, 10);
        return this.userRepository.create({ email, password: hashed });
    }
    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user)
            return null;
        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
            return null;
        return user;
    }
}

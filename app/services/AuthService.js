import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository.js';
import { comparePassword, generateToken, hashPassword } from '../auth.js';

class AuthService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(firstname, lastname, email, birthdate, password) {
        const hashedPassword = await hashPassword(password);
        const user = await this.userRepository.create(firstname, lastname, email, birthdate, hashedPassword);
        return user;
    }

    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const passwordMatch = await comparePassword(password, user.password);

        if (!passwordMatch) {
            throw new Error('Invalid credentials');
        }

        const token = await generateToken({
            id: user.id,
            access: [
                'authentication',
                'film',
            ]
        }, "1h");

        const userWithoutPassword = {
            ...user.toJSON(),
            password: undefined,
        };

        return {
            token,
            user: userWithoutPassword,
        };
    }

    async me(id) {
        const user = await this.userRepository.findById(id);
        return user;
    }
}

export default AuthService;

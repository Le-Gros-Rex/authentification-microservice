import User from './UserEntity.js';

class UserRepository {
    async create(firstname, lastname, email, birthdate, password) {
        return User.create({ firstname, lastname, email, birthdate, password });
    }

    async findByEmail(email) {
        return User.findOne({ where: { email } });
    }

    async findById(id) {
        return User.findByPk(id, { attributes: { exclude: ['password'] } });
    }
}

export default UserRepository;

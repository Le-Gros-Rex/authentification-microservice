import AuthService from '../services/AuthService.js';

class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    async register(req, res) {
        if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.birthdate || !req.body.password) {
            res.status(400).json({ error: 'Missing parameters' });
            return;
        }

        const { firstname, lastname, email, birthdate, password } = req.body;

        try {
            const user = await this.authService.register(firstname, lastname, email, birthdate, password);
            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message || 'Failed to register user' });
        }
    }

    async login(req, res) {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ error: 'Missing parameters' });
            return;
        }

        const { email, password } = req.body;

        try {
            const user = await this.authService.login(email, password);
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }

    async me(req, res) {
        try {
            const user = await this.authService.me(req.user.id);
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message || 'Failed to fetch user' });
        }
    }
}

export default AuthController;

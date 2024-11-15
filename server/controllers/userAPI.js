const { User } = require('../models/User');


class userAPI {
    static async getUser(req, res) {
        
        res.send('get user');
    }

    static async getUserById(req, res) {
        let user = await model.User.findById( req.params.id);
        if (user) {
            res.json(user)
        } else {
            response.sendStatus(404)
        }

        res.send('get user by id');
    }

    static async createUser(req, res) {
        
        res.send('create user');
    }

    static async updateUser(req, res) {
        res.send('update user');
    }
    
    static async deleteUser(req, res) {
        res.send('delete user');
    }
}
const { User } = require('../models/User');

class userAPI {
    static async getUser(req, res) {
        res.status(200).json({ user: req.session.user });
    }

    static async getUserById(req, res) {
        try {
            let user = await User.findById(req.params.id);
            if (user) {
                res.status(200).json(user)
            } else {
                res.sendStatus(404)
            }
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            res.sendStatus(500); // Internal Server Error
        }
    }
    
    static async createUser(req, res) {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (user) {
                return res.status(200).json({user: user});
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        const newUser = new User({
            username: req.body.username,
        });

        if (!req.body.password) {
            return res.status(400).json({ message: "Password is required" });
        }

        newUser.setEncryptedPassword(req.body.password).then(function () {
            newUser.save().then(() => {
                req.session.user = newUser;
                res.status(201).json(newUser);
            }).catch((err) => {
                if (err.errors) {
                    var errorMessages = {};
                    for (var fieldName in err.errors) {
                        errorMessages[fieldName] = err.errors[fieldName].message;
                    }
                    return res.status(422).json(errorMessages);
                } else if (err.code == 11000) {
                    return res.status(422).json({ username: "User with that username already exists!" });
                } else {
                    console.log(err);
                    return res.status(500).send("Unknown error creating user.");
                }
            });
        });
    }
    
    static async deleteUser(req, res) {
        const user = req.session.user;
        try {
            await User.findByIdAndDelete(user._id);
            res.sendStatus(204);
        } catch (error) {
            console.error("Error deleting user:", error);
            res.sendStatus(500); // Internal Server Error
        }
    }

    static async getSession(req, res) {
        User.findOne({_id: req.session.user._id}).then((user) => {
            res.json({user: user});
        })
    }

    static async logoutUser(req, res) {
        req.session.user = null;
        res.status(200).send("Logged out!");
    }

    static async loginUser(req, res) {
        User.findOne({ username: req.body.username }).then((user) => {
            if (user) {
                const password = req.body.password || "";
                user.verifyPassword(password).then((isVerified) => {
                    if (isVerified) {
                        req.session.user = user;
                        res.status(201).json({user: user});
                    } else {
                        res.status(401).send("Invalid password!");
                    }
                });
            } else {
                res.status(401).send("Not authenticated!");
            }
        });
    }
}

module.exports = userAPI;
const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//SignIn API

router.post("/sign-in", async (req, res) => {
    try {
        const { username } = req.body;
        const { password } = req.body;
        const { email } = req.body;
        const existingUser = await User.findOne({ username: username });
        const existingEmail = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        else if (username.length < 4) {
            return res.status(400).json({ message: "Username have at least 4 characters" })
        }

        if (existingEmail) {
            return res.status(400).json({ message: "Email already present" });
        }
        const hashPass = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPass,
        });
        await newUser.save();
        return res.status(200).json({ message: "SignIn successfully" });
        
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error" });
    }
});


//LogIn API

router.post("/log-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare passwords using bcrypt
        bcrypt.compare(password, existingUser.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: "Error comparing passwords" });
            }

            if (isMatch) {
                // Generate JWT token on successful login
                console.log('User ID:', existingUser._id);
                const authClaims = [{ _id: existingUser._id,name: username },{jiti:jwt.sign({},"TMPRO")}];  // JWT claims
                const token = jwt.sign({authClaims}, "TMPRO", { expiresIn: "2d" });

                return res.status(200).json({ id: existingUser._id, token:token });
            } else {
                return res.status(400).json({ message: "Invalid credentials" });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

})

module.exports = router;
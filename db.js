const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@cluster0.ltmdv.mongodb.net/JmUsers?retryWrites=true&w=majority`;

mongoose.connect(uri, {useNewUrlParser: true});

mongoose.connection.on("error", (error) => {
    console.log(error);
})

mongoose.connection.on("open", () => {
    console.log("Connected to database!");
})

/////////////////////////////////////////////////////////

const userSchema = new mongoose.Schema({
    id: Number,
    reps: Number
})

const User = mongoose.model("User", userSchema, "users");

async function createUser(uid, amount) {
    newUser = new User({id: uid, reps: amount});
    await newUser.save();
}

async function doesUserExist(uid) {
    return await User.findOne({id: uid});
}

async function updateUser(uid, amount) {
    if (await doesUserExist(uid) == null) {
        console.log("User doesn't exist!");
        return;
    }

    await User.updateOne({id: uid}, {$inc : {'reps': amount}})

    console.log("Success")
}

module.exports = {
    createUser,
    updateUser,
    doesUserExist
}
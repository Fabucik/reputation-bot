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
    id: String,
    reps: Number,
    repTime: String
})

const User = mongoose.model("User", userSchema, "users");

async function createUser(uid, amount, time) {
    newUser = new User({id: uid, reps: amount, repTime: time});
    await newUser.save();
}

async function getUser(uid) {
    return await User.findOne({id: uid});
}

async function updateUserReps(uid, amount) {
    if (await getUser(uid) == null) {
        console.log("User doesn't exist!");
        return;
    }

    await User.updateOne({id: uid}, {$inc : {'reps': amount}});

    console.log("Success");
}

async function updateUserTime(uid, time) {
    if (await getUser(uid) == null) {
        console.log("User Doesn't exist!");
        return;
    }

    await User.updateOne({id: uid}, {repTime: JSOn.stringify(time)});
}

/////////////////////////////////////////////////////////

const botSchema = new mongoose.Schema({
    id: String,
    prefix: String
})

const RepBot = mongoose.model("RepBot", botSchema, "repbot");

async function updatePrefix(bid, bprefix) {
    await RepBot.updateOne({id: bid}, {prefix: bprefix});
}

async function getPrefix(bid) {
    return await RepBot.findOne({id: bid}).then(result => result.prefix);
}

module.exports = {
    createUser,
    updateUserReps,
    getUser,
    updatePrefix,
    getPrefix,
    updateUserTime
}
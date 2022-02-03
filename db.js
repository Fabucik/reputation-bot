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

const User = mongoose.model("User", userSchema);

async function createUser(uid, amount) {
    newUser = new User({id: uid, reps: amount});
    await newUser.save();
}

async function doesUserExists(uid) {
    var usr = await User.findOne({id: uid});
    return usr;
    
}

async function main() {
    console.log(await doesUserExists(1234));
}

main();
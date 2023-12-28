const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {

        email: {
            type: String,
            require: true,
            trim: true,
            unique: true,
            lowercase: true,
            index: true,
        }

    },
    { timestamps: true }, { strict: false }
);


module.exports = mongoose.model("User", userSchema);

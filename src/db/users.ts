import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    authentication: {
        password: { 
            type: String,
            required: true,
            select: false,
         },
         salt: {
            type: String,
            select: false,
         },
         sessionToken: {
            type: String,
            select: false,
         },
    }
});

export const User = mongoose.model('User', userSchema);

export const getUsers = () => {
    return User.find({});
}

export const getUserByEmail = (email: string) =>  User.findOne({ email: email });

export const getUserBySessionToken = async (sessionToken: string) => {
    return User.findOne({ 'authentication.sessionToken': sessionToken });
}

export const getUserById = async (id: string) => {
    return User.findById(id);
}

export const createUser = (values: Record<string, any>) => new User(values).save().then((user) => user.toObject());


export const deleteUserById = async (id: string) => {
    return User.findByIdAndDelete(id);
}

export const updateUserById = async (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values);
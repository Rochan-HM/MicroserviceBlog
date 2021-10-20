import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Interface for new user creation
interface UserAttributes {
    email: string;
    password: string;
}

// Interface for return type of build func below. Also for properties on user object
interface UserProps extends mongoose.Document {
    email: string;
    password: string;
}

// Interface to add custom function to user schema
interface UserModel extends mongoose.Model<UserProps> {
    build(attrs: UserAttributes): UserProps;
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
            },
            versionKey: false,
        },
    }
);

// Do not use => functions since we need access to `this`.
userSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const hashed_pwd = await bcrypt.hash(this.get("password"), 8);
        this.set("password", hashed_pwd);
    }

    done();
});

userSchema.statics.build = (attrs: UserAttributes) => new User(attrs);

const User = mongoose.model<UserProps, UserModel>("User", userSchema);

export { User };

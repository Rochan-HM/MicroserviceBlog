import mongoose from "mongoose";

interface PostAttributes {
    title: string;
    body?: string;
    userId: string;
}

interface PostProps extends mongoose.Document {
    title: string;
    body?: string;
    userId: string;
}

interface TicketModel extends mongoose.Model<PostProps> {
    build(attrs: PostAttributes): PostProps;
}

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: false,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
            versionKey: false,
        },
    }
);

postSchema.statics.build = (attrs: PostAttributes) => new Post(attrs);

const Post = mongoose.model<PostProps, TicketModel>("Post", postSchema);

export { Post };

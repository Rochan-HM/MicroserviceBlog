import mongoose from "mongoose";

interface CommentAttributes {
    body: string;
    userId: string;
    postId: string;
}

interface CommentProps extends mongoose.Document {
    body: string;
    userId: string;
    postId: string;
}

interface CommentModel extends mongoose.Model<CommentProps> {
    build(attrs: CommentAttributes): CommentProps;
}

const commentSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        postId: {
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

commentSchema.statics.build = (attrs: CommentAttributes) => new Comment(attrs);

const Comment = mongoose.model<CommentProps, CommentModel>(
    "Comment",
    commentSchema
);

export { Comment };

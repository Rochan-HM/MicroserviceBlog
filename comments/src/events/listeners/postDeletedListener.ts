import { Message } from "node-nats-streaming";
import { Subjects, Listener, PostDeletedEvent } from "@rmcommons/ticketapp";
import { Comment } from "../../models/comment";
import queueGroupName from "./queueGroupName";

export class PostDeletedListener extends Listener<PostDeletedEvent> {
    readonly subject = Subjects.PostDeleted;
    queueGroupName = queueGroupName;

    async onMessage(data: PostDeletedEvent["data"], msg: Message) {
        const { id: postId, title } = data;

        await Comment.deleteMany({ postId });

        console.log(`All comments wrt post ${postId} - ${title} deleted`);

        msg.ack();
    }
}

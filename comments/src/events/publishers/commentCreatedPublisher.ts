import { Publisher, Subjects, CommentCreatedEvent } from "@rmcommons/blogapp";

export class CommentCreatedPublisher extends Publisher<CommentCreatedEvent> {
    readonly subject = Subjects.CommentCreated;
}

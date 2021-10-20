import { Publisher, Subjects, CommentUpdatedEvent } from "@rmcommons/blogapp";

export class CommentUpdatedPublisher extends Publisher<CommentUpdatedEvent> {
    readonly subject = Subjects.CommentUpdated;
}

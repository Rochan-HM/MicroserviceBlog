import { Publisher, Subjects, CommentDeletedEvent } from "@rmcommons/blogapp";

export class CommentDeletedPublisher extends Publisher<CommentDeletedEvent> {
    readonly subject = Subjects.CommentDeleted;
}

import { Publisher, Subjects, CommentDeletedEvent } from "@rmcommons/ticketapp";

export class CommentDeletedPublisher extends Publisher<CommentDeletedEvent> {
    readonly subject = Subjects.CommentDeleted;
}

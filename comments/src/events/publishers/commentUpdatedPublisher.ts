import { Publisher, Subjects, CommentUpdatedEvent } from "@rmcommons/ticketapp";

export class CommentUpdatedPublisher extends Publisher<CommentUpdatedEvent> {
    readonly subject = Subjects.CommentUpdated;
}

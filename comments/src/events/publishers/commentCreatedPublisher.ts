import { Publisher, Subjects, CommentCreatedEvent } from "@rmcommons/ticketapp";

export class CommentCreatedPublisher extends Publisher<CommentCreatedEvent> {
    readonly subject = Subjects.CommentCreated;
}

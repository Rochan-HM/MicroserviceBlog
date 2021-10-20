import { Publisher, Subjects, PostCreatedEvent } from "@rmcommons/ticketapp";

export class PostCreatedPublisher extends Publisher<PostCreatedEvent> {
    readonly subject = Subjects.PostCreated;
}

import { Publisher, Subjects, PostUpdatedEvent } from "@rmcommons/ticketapp";

export class PostUpdatedPublisher extends Publisher<PostUpdatedEvent> {
    readonly subject = Subjects.PostUpdated;
}

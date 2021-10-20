import { Publisher, Subjects, PostDeletedEvent } from "@rmcommons/ticketapp";

export class PostDeletedPublisher extends Publisher<PostDeletedEvent> {
    readonly subject = Subjects.PostDeleted;
}

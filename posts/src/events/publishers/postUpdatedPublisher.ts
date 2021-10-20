import { Publisher, Subjects, PostUpdatedEvent } from "@rmcommons/blogapp";

export class PostUpdatedPublisher extends Publisher<PostUpdatedEvent> {
    readonly subject = Subjects.PostUpdated;
}

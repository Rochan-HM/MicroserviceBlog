import { Publisher, Subjects, PostCreatedEvent } from "@rmcommons/blogapp";

export class PostCreatedPublisher extends Publisher<PostCreatedEvent> {
    readonly subject = Subjects.PostCreated;
}

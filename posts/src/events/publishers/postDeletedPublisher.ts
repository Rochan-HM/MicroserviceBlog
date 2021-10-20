import { Publisher, Subjects, PostDeletedEvent } from "@rmcommons/blogapp";

export class PostDeletedPublisher extends Publisher<PostDeletedEvent> {
    readonly subject = Subjects.PostDeleted;
}

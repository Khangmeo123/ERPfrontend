import { CommentEntity } from './Comment.Entity';

export class SearchPostEntity {
    id: string;
    discussionId: string;
    content: string;
    userId: string;
    createdDate: string;
    updatedDate: string;
    commentEntities: Array<CommentEntity>;
    constructor(catalog: any = null) {
    }
}

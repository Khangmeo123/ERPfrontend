import { CommentEntity } from './Comment.Entity';
import { SearchEntity } from 'src/app/_helpers/search-entity';

export class SearchPostEntity{
    id: string;
    documentId: string;
    content: string;
    creatorId: string;
    time: string;
    comments: Array<CommentEntity>;
    constructor(postSearchEntity: any = null) {
    }
}

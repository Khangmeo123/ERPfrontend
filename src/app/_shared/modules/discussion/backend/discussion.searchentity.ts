import { CommentEntity } from './comment.entity';

export class SearchPostEntity {
  id: string;
  documentId: string;
  content: string;
  creatorId: string;
  time: string;
  comments: Array<CommentEntity>;

  constructor(postSearchEntity: any = null) {
  }
}

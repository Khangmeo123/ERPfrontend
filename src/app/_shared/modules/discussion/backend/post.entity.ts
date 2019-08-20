import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';
import { Entity } from 'src/app/_helpers/entity';

export class PostEntity extends Entity {
  id: string = null;
  disabled: boolean = false;
  documentId: string = null;
  content: string = null;
  creatorId: string = null;
  time: string = null;
  creatorName: string = null;
  userEntity: UserEntity = new UserEntity();
  comments: Array<CommentEntity> = [];
  isEdit: boolean = false;
  isShowComment: boolean = false;

  constructor(Post?: any) {
    super(Post);
  }
}

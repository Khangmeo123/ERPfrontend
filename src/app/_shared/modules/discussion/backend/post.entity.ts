import { UserEntity } from './user.entity';
import { CommentEntity } from './Comment.Entity';

export class PostEntity {
    id: string = null;
    discussionId: string = null;
    content: string = null;
    userId: string = null;
    createdDate: string = null;
    updatedDate: string = null;
    userEntity: UserEntity = new UserEntity();
    CommentEntities: Array<CommentEntity> = [];
    isEdit: boolean = false;
    isShowComment: boolean = false;
    location: string = null;
    constructor(Post: any = null) {
    }
}

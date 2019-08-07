import { UserEntity } from './user.entity';
import { CommentEntity } from './Comment.Entity';

export class PostEntity {
    id: string = null;
    disabled: boolean = false;
    documentId: string = null;
    content: string = null;
    creatorId: string = null;
    time: string = null;
    userEntity: UserEntity = new UserEntity();
    comments: Array<CommentEntity> = [];
    isEdit: boolean = false;
    isShowComment: boolean = false;
    location: string = null;
    constructor(Post: any = null) {
    }
}

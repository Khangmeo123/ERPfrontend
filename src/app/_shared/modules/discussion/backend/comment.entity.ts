import { UserEntity } from './user.entity';
export class CommentEntity {

    id: string = null;
    postId: string = null;
    content: string = null;
    userId: string = null;
    createdDate: string = null;
    updatedDate: string = null;
    userEntity: UserEntity = new UserEntity();
    isEdit: boolean = false;

    constructor(Comment: any = null) {
    }
}

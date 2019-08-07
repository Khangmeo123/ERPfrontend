import { UserEntity } from './user.entity';
export class CommentEntity {

    id: string = null;
    postId: string = null;
    content: string = null;
    creatorId: string = null;
    time: string = null;
    // userEntity: UserEntity = new UserEntity();
    isEdit: boolean = false;
    disabled: boolean = false;

    constructor(Comment: any = null) {
    }
}

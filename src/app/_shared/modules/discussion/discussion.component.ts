import { PostEntity } from './backend/post.entity';
import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DiscussionService } from './backend/discussion.service';
import { SearchPostEntity } from './backend/discussion.searchentity';
import { CommentEntity } from './backend/comment.entity';
import { UserEntity, SearchUserEntity } from './backend/user.entity';
import { InputDiscussionComponent } from './input-discussion/input-discussion.component';

@Component({
    selector: 'app-discussion',
    templateUrl: './discussion.component.html',
    styleUrls: ['./discussion.component.css'],
    providers: [DiscussionService],
})
export class DiscussionComponent {
    postEntities: Array<PostEntity> = [];
    searchPostEntity: SearchPostEntity = new SearchPostEntity();
    id: string = null;
    userList: Array<UserEntity> = [];
    postToSend: PostEntity = new PostEntity();
    commentToSend: CommentEntity = new CommentEntity();
    postInputDiscussionComponent: InputDiscussionComponent = new InputDiscussionComponent();
    commentInputDiscussionComponent: Array<InputDiscussionComponent> = [];
    currentUser: UserEntity = new UserEntity();

    @Input()
    set discussionId(value: string) {
        this.id = value;
        this.discussionService.discussionId = value;
        this.postToSend.documentId = value;
        Object.assign(this.currentUser, this.discussionService.userEntity);
        this.getPosts();
    }

    get discussionId(): string {
        return this.id;
    }

    constructor(
        private router: Router,
        private discussionService: DiscussionService,
        private location: Location) {
    }

    getPosts() {
        this.searchPostEntity = new SearchPostEntity();
        this.searchPostEntity.discussionId = this.discussionService.discussionId;
        this.discussionService.getPosts(this.searchPostEntity).subscribe(p => {
            this.postEntities = p;
            this.postEntities.forEach(X => {
                this.commentInputDiscussionComponent.push(new InputDiscussionComponent());
            });
        }, e => {
            // this.toastr.ShowError('Có lỗi xảy ra');
        });
    }

    getComments(postEntity: PostEntity) {
        this.discussionService.getComments(postEntity.id).subscribe(p => {
            postEntity.comments = p.CommentEntities;
        });
    }

    searchUserList(event) {
        for (let i = 1; i < 10; i++) {
            const user = new UserEntity();
            user.name = 'ThangL' + i;
            user.display = 'Le Duc Thang ' + 1;
            this.userList.push(user);
        }
        // this.userList = null;
        // const searchUserEntity: SearchUserEntity = new SearchUserEntity();
        // searchUserEntity.name.contains = event.SearchData;
        // searchUserEntity.skip = 0;
        // searchUserEntity.take = 10;
        // this.discussionService.getUserLists(searchUserEntity).subscribe(p => {
        //     this.userList = p;
        // });
    }

    sendPost(event?) {
        const post: any = {};
        // post.UserId = this.currentUser.id;
        post.DiscussionId = this.discussionService.discussionId;
        post.Location = window.location.href;
        if (event == null) {
            post.content = document.getElementById(this.postInputDiscussionComponent.Id).innerHTML;
            document.getElementById(this.postInputDiscussionComponent.Id).innerHTML = '';
        } else {
            post.content = event.Content;
        }
        this.discussionService.createPost(post).subscribe(p => {
            this.getPosts();
        }, e => {
            // if (e.error.Errors !== null && e.error.Errors !== undefined) this.toastr.ShowError(e.error.Errors.Content);
            // else this.toastr.ShowError('Có lỗi xảy ra trong quá trình gửi bình luận');
        });
    }

    editPost($event) {
        // this.PostToSend.Content = document.getElementById(this.PostInputDiscussionComponent.Id).innerHTML;
        // document.getElementById(this.PostInputDiscussionComponent.Id).innerHTML = "";
        this.discussionService.updatePost($event).subscribe(p => {
            this.getPosts();
        });
    }

    deletePost(index: number) {
        // this.postToSend.content = document.getElementById(this.postInputDiscussionComponent.id).innerHTML;
        // document.getElementById(this.postInputDiscussionComponent.Id).innerHTML = '';
        this.discussionService.deletePost(this.postEntities[index]).subscribe(p => {
            this.postEntities.splice(index, 1);
        });
    }


    sendComment(index: number, event, post: PostEntity) {
        event.userId = this.currentUser.id;
        event.postId = post.id;
        event.location = post.location;
        this.discussionService.createComment(event).subscribe(p => {
            document.getElementById(this.commentInputDiscussionComponent[index].Id).innerHTML = '';
            this.getComments(this.postEntities[index]);
        }, e => {
            // if (e.error.Errors !== null && e.error.Errors !== undefined) this.toastr.ShowError(e.error.Errors.Content);
            // else this.toastr.ShowError('Có lỗi xảy ra trong quá trình gửi bình luận');
        });
    }

    editComment(postEntity: PostEntity, $event) {
        // this.PostToSend.Content = document.getElementById(this.PostInputDiscussionComponent.Id).innerHTML;
        // document.getElementById(this.PostInputDiscussionComponent.Id).innerHTML = "";
        this.discussionService.updateComment($event).subscribe(p => {
            this.getComments(postEntity);
        });
    }

    deleteComment(i: number, j: number) {
        // this.postToSend.content = document.getElementById(this.postInputDiscussionComponent.id).innerHTML;
        // document.getElementById(this.postInputDiscussionComponent.id).innerHTML = '';
        this.discussionService.deleteComment(this.postEntities[i].comments[j]).subscribe(p => {
            this.postEntities[i].comments.splice(j, 1);
        });
    }
}

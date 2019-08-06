import { SearchPostEntity } from './discussion.searchentity';
import { UserEntity, SearchUserEntity } from './user.entity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export class DiscussionService {
    public url: string;
    public urlComment: string;
    public discussionId: string;
    public userEntity: UserEntity = new UserEntity();

    constructor(public http: HttpClient) {
        this.url = 'api/Posts';
        this.urlComment = 'api/Comments';
    }

    getPosts(searchPostEntity: SearchPostEntity): Observable<any> {
        return;
    }

    getComments(postId: string): Observable<any> {
        return;
    }

    createPost(data: any): Observable<any> {
        return;
    }

    deletePost(data: any): Observable<any> {
        return;
    }

    createComment(data: any): Observable<any> {
        return;
    }

    updatePost(data: any): Observable<any> {
        return;
    }

    updateComment(data: any): Observable<any> {
        return;
    }

    deleteComment(data: any): Observable<any> {
        return;
    }

    getUserLists(searchUserEntity: SearchUserEntity): Observable<any> {
        return;
    }

    getHeaders() {

    }
}

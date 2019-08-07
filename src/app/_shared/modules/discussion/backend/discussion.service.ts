import { SearchPostEntity } from './discussion.searchentity';
import { UserEntity, SearchUserEntity } from './user.entity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entities } from 'src/app/_helpers/entity';
import { Repository } from 'src/app/_helpers/repository';
import { PostEntity } from './post.entity';

export class DiscussionService extends Repository{
    public url: string;
    public urlComment: string;
    public discussionId: string;
    public userEntity: UserEntity = new UserEntity();

    constructor(public http: HttpClient) {
        super(http);
        this.url = 'api/INV/discussion';
        this.urlComment = 'api/INV/discussion/comment';
    }

    getPosts(searchPostEntity: SearchPostEntity): Observable<any> {
        return this.http.post<PostEntity[]>(this.url + '/get', JSON.stringify(searchPostEntity),
        { observe: 'response', headers: this.getHeader() }).pipe(
            map(r => {
                return r.body.map((item) => {
                    return new PostEntity(item);
                });
            }),
        );
        // return;
    }

    getComments(postId: string): Observable<any> {
        return;
    }

    createPost(data: any): Observable<any> {
        return this.http.post<boolean>(this.url + '/create', JSON.stringify(data),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
        // return;
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

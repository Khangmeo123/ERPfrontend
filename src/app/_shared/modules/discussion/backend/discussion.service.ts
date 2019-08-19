import { SearchPostEntity } from './discussion.searchentity';
import { SearchUserEntity, UserEntity } from './user.entity';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entities } from 'src/app/_helpers/entity';
import { Repository } from 'src/app/_repositories/repository';
import { PostEntity } from './post.entity';
import { environment } from 'src/environments/environment';
import { CommentEntity } from './comment.entity';

export class DiscussionService extends Repository {
  public url: string;
  public urlComment: string;
  public documentId: string;
  public userEntity: UserEntity = new UserEntity();

  constructor(public http: HttpClient) {
    super(http);
    this.url = environment.apiUrlInv + 'discussion';
    this.urlComment = environment.apiUrlInv + 'discussion/comment';
  }

  getPosts(searchPostEntity: SearchPostEntity): Observable<any> {
    return this.http.post<PostEntity[]>(this.url + '/list', JSON.stringify(searchPostEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body;
      }),
    );
  }

  createPost(data: any): Observable<any> {
    return this.http.post<boolean>(this.url + '/create', JSON.stringify(data),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  updatePost(data: any): Observable<any> {
    return this.http.post<boolean>(this.url + '/update', JSON.stringify(data),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  deletePost(data: any): Observable<any> {
    return this.http.post<boolean>(this.url + '/delete', JSON.stringify(data),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getComments(commentid: string): Observable<any> {
    return this.http.post<CommentEntity[]>(this.urlComment + '/get', JSON.stringify({id: commentid}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body;
      }),
    );
  }


  createComment(data: any): Observable<any> {
    return this.http.post<boolean>(this.urlComment + '/create', JSON.stringify(data),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }


  updateComment(data: any): Observable<any> {
    return this.http.post<boolean>(this.urlComment + '/update', JSON.stringify(data),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  deleteComment(data: any): Observable<any> {
    return this.http.post<boolean>(this.urlComment + '/delete', JSON.stringify(data),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getUserLists(searchUserEntity: SearchUserEntity): Observable<any> {
    return this.http.post<Entities>(this.url + '/list-user-tagged', JSON.stringify(searchUserEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        r.body.ids = r.body.ids.map(item => {
          return new UserEntity(item);
        });
        r.body.exceptIds = r.body.exceptIds.map(item => {
          return new UserEntity(item);
        });
        return r.body;
      }),
    );
  }

  getHeaders() {

  }
}

import {Injectable} from "@angular/core";
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "./post.model";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, Subject, throwError} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class PostsService {

    error: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient) {
    }

    createAndStorePost(title: string, content: string) {

        const postData: Post = {
            title: title,
            content: content,
        }

        return this.http.post<{ name: string }>(
            'https://angular-udemy-course-3f1b3-default-rtdb.firebaseio.com/posts.json',
            postData,
            {
                observe: 'response'
            }
        );
    }

    fetchPosts(): Observable<Post[]> {

        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key');

        return this.http.get<{ [key: string]: Post }>(
            'https://angular-udemy-course-3f1b3-default-rtdb.firebaseio.com/posts.json',
            {
                headers: new HttpHeaders({'custom-header': 'hello'}),
                params: searchParams,
                responseType: 'json'
            }
        )
            .pipe(
                map((responseData) => {

                    const postsArray = [];

                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({...responseData[key], id: key});
                        }
                    }

                    return postsArray;
                }),
                catchError(errorRes => {
                    // send to analytics server
                    return throwError(errorRes);
                })
            );
    }

    deletePosts() {
        return this.http.delete(
            'https://angular-udemy-course-3f1b3-default-rtdb.firebaseio.com/posts.json',
            {
                observe: 'events',
                responseType: 'text'
            }
        ).pipe(
            tap(event => {
                console.log(event);
                if (event.type === HttpEventType.Sent) {
                    //...
                }
                if (event.type === HttpEventType.Response) {
                    console.log(event.body);
                }
            })
        )
    }
}

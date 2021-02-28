import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {Post} from './post.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loadedPosts: Post[] = [];
    isFetching = false;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.fetchPosts();
    }

    onCreatePost(postData: Post) {
        // Send Http request
        this.http.post<{ name: string }>('https://angular-udemy-course-3f1b3-default-rtdb.firebaseio.com/posts.json', postData).subscribe(
            (res) => console.log('post completed: ', res),
            error => console.error(error),
        );
    }

    onFetchPosts() {
        // Send Http request
        this.fetchPosts();
    }

    onClearPosts() {
        // Send Http request
    }

    private fetchPosts() {

        this.isFetching = true;

        this.http.get<{ [key: string]: Post }>('https://angular-udemy-course-3f1b3-default-rtdb.firebaseio.com/posts.json')
            .pipe(
                map((responseData) => {

                    const postsArray = [];

                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({...responseData[key], id: key});
                        }
                    }

                    return postsArray;
                })
            )
            .subscribe(
                (posts: Post[]) => {
                    this.loadedPosts = posts;
                    this.isFetching = false;
                },
                error => {
                    console.error(error);
                    this.isFetching = false;
                }
            );
    }
}

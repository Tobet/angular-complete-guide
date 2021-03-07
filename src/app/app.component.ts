import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {Post} from './post.model';
import {PostsService} from './posts.service';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    loadedPosts: Post[] = [];
    isFetching = false;
    error: string;
    subscription: Subscription;

    constructor(private http: HttpClient, private postsService: PostsService) {
    }

    ngOnInit() {

        this.subscription = this.postsService.error.subscribe(
            (errorMessage: string) => this.error = errorMessage,
        );

        this.isFetching = true;

        this.postsService.fetchPosts()
            .subscribe(
                (posts: Post[]) => {
                    this.isFetching = false;
                    this.loadedPosts = posts;
                },
                error => {
                    console.error(error);
                    this.error = error.message;
                    this.isFetching = false;
                }
            );
    }

    onCreatePost(postData: Post) {
        this.postsService.createAndStorePost(postData.title, postData.content)
            .subscribe(
                (res) => {
                    console.log('post completed: ', res);
                    this.onFetchPosts();
                },
                error => console.error(error),
            );
    }

    onFetchPosts() {

        this.isFetching = true;

        this.postsService.fetchPosts()
            .subscribe(
                (posts: Post[]) => {
                    this.isFetching = false;
                    this.loadedPosts = posts;
                },
                error => {
                    console.error(error);
                    this.error = error.message;
                    this.isFetching = false;
                }
            );
    }

    onClearPosts() {

        this.isFetching = true;

        this.postsService.deletePosts()
            .subscribe(
                () => {
                    console.log('posts cleared');
                    this.loadedPosts = [];
                    this.isFetching = false;
                },
                error => {
                    console.error(error);
                    this.isFetching = false;
                },
            )
    }

    onHandleError() {
        this.error = null;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

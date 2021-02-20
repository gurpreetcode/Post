import { Component, OnDestroy, OnInit } from "@angular/core";
import {Subscription} from 'rxjs';
import {Post} from '../post.model';
import { PostsService } from "../posts.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content:'THis is first post content'},
  //   {title: 'Second Post', content:'THis is second post content'},
  //   {title: 'Third Post', content:'THis is third post content'},
  // ];
  posts: Post[] = [];
  private PostsSub: Subscription;
  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.PostsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  onDelete(postId: string){
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.PostsSub.unsubscribe();
  }
}

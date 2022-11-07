import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, UntypedFormControl} from "@angular/forms";
import {PostService} from "../../shared/post/service/post.service";
import {Router} from "@angular/router";
import {LoggedUserService} from "../../shared/logged-user/logged-user.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  form: FormGroup;
  captionFormControl: UntypedFormControl;
  file: File;

  constructor(private postService: PostService, private router: Router, private loggedUserService: LoggedUserService) {
  }

  ngOnInit(): void {
    this.captionFormControl = new FormControl('');

    this.form = new FormGroup({
      caption: this.captionFormControl
    })
  }

  onFileChanged(event: any) {
    this.file = (event.target).files[0] as File;
  }

  post(): void {
    this.postService.createPost(this.file, this.captionFormControl.value)
      .subscribe(() => {
          const userId = this.loggedUserService.getUserId();
          this.router.navigate(['/secured/users/' + userId]);
        }
      );
  }
}

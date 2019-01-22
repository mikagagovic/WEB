import { Component, OnInit } from '@angular/core';
import { Service } from '../service.model';
import { HttpCommentService } from '../../comment/comment.service';
import { Router } from '@angular/router';
import { HttpServiceService } from '../service.service';
import { MdSnackBar, MdDialogRef } from '@angular/material';
import { Comment } from '../../comment/comment.model';

@Component({
  selector: 'app-service-comments',
  templateUrl: './service-comments.component.html',
  styleUrls: ['./service-comments.component.css']
})
export class ServiceCommentsComponent implements OnInit {

  public commentService:Service;
  public comments : Array<Comment>;
  public adminRole:boolean;
  constructor(private httpCommentService: HttpCommentService,
    private router: Router,private httptServiceService : HttpServiceService,
    private snackBar:MdSnackBar) { }
  

  ngOnInit() {
    this.httptServiceService.getService(this.commentService.Id).subscribe((res: any) => {
      this.commentService = res; console.log(this.commentService);
    },
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }
  getNotification(evt) {
    this.ngOnInit();
}
  
  deleteComment(comment:Comment){

    this.httpCommentService.deleteComment(comment.Id).subscribe(
      ()=>{
        console.log('Comment ' + comment.Id + ' successfully deleted');
        this.snackBar.open("Comment" + comment.Id +  " successfully deleted", "", { duration: 2500,});
        this.ngOnInit();
      },
      error=>{alert("Comment " + comment.Id + " failed delete!"); console.log(error);}
    );
  }

  }



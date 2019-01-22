import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Comment} from "../comment.model"
import { Http, Headers, Response } from '@angular/http';
import {HttpCommentService} from "../comment.service"
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "../../appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {HttpServiceService} from "../../service/service.service"
import {MdSnackBar} from "@angular/material"

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css'],
  providers: [HttpCommentService]
})
export class CommentAddComponent implements OnInit {
  
  @Input() Service_Id:number;
  public appUserRole:boolean;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  nComment:any={};
  public numbers : Array<number>;
  private role:string;

  constructor(private httpCommentService:HttpCommentService,
              private router: Router,
              private snackBar:MdSnackBar) {
    
    this.numbers = [1,2,3,4,5];
  }
  
  
  ngOnInit() {
    this.appUserRole=false;
    this.createPermisions();
  }

  createPermisions(){
      this.role=localStorage.getItem('role');
      if(this.role=="User"){
          this.appUserRole=true;
      }
  }

  saveComment(comment: Comment, form: NgForm,serviceid:number){
       comment.Service_Id = serviceid;
       
       this.httpCommentService.postComment(comment).subscribe(
          ()=>{ 
            console.log('Comment successfuly posted');
            this.snackBar.open("Comment successfuly posted", "", { duration: 2500,});
            this.notifyParent.emit("Some message to parrent");
          },
          error => {alert("Close!"); console.log(error);}
        );
  }
}
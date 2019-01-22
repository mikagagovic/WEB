import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle/vehicle.model';
import { MdSnackBar, MdDialog, MdDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { HttpRentService } from './rent.service';
import { Rent } from './rent.model';
import { Branch } from '../branch/branch.model';
import { HttpBranchService } from '../branch/branch.service';
import { NgForm } from '@angular/forms';
import { ImageuploadComponent } from '../imageupload/imageupload.component';
import { error } from 'util';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  public eVehicle : Vehicle;
  public nRent :any={};
  public postRent: Rent;
  public role:string;
  public managerRole:boolean;
  public userRole:boolean;
  public rents : Array<Rent>;
  public branches: Array<Branch>;
  public errorMessage: string;

  constructor(
    private httpRentService : HttpRentService,private httpBranchService:HttpBranchService,
    private router: Router,
    public dialog:MdDialog,
    private snackBar: MdSnackBar)  { }

  ngOnInit() {

    this.userRole=false;
    this.managerRole=false;
    this.createPermisions();

     this.httpBranchService.getBranchesForService(this.eVehicle.Service_Id).subscribe((res: any) => {
        this.branches = res; console.log(this.rents);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
  }

   createPermisions(){
      this.role=localStorage.getItem('role');
      if(this.role=="User"){
          this.userRole=true;
      }else if(this.role=="Manager"){
          this.managerRole=true;
          
      }
  }

  saveRent(rent: Rent, form: NgForm){
    var date = new Date();
    var startDate = new Date(rent.StartDate);
    var endDate = new Date(rent.EndDate);
    if (date > startDate)
    {
      this.openSnackBar("Start date cant be later then current date","");
      return;
    }
    if (endDate < startDate)
    {
      this.openSnackBar("End date must be later or equal then start date","");
      return;
    }
    var g = false;

    this.postRent = new Rent();
    this.postRent.StartDate = startDate;
    this.postRent.EndDate = endDate;
    this.postRent.Vehicle_Id = this.eVehicle.Id;
    this.postRent.BranchTook_Id = rent.BranchTook_Id;
    this.postRent.BranchReturn_Id = rent.BranchReturn_Id;
    this.postRent.Image = rent.Image;

     this.httpRentService.postRent(this.postRent).subscribe(
        (data:any)=>{ 
          console.log('Rent successfuly posted');
          this.snackBar.open("Rent successfuly posted", "", { duration: 2500,});
          this.router.navigate(['/vehicle']);
          this.openSnackBar("Succesfuly reserve","");
        },
        (error: any) => {
          this.errorMessage = error.json();
          debugger;
          console.log(error);
      });
      
      this.ngOnInit();
   
  }
  openChooseImagesDialog(){
    let config = new MdDialogConfig();
    config.height='530px';
    config.width='350px';

    let dialogRef = this.dialog.open(ImageuploadComponent,config);
    dialogRef.componentInstance.rent=this.nRent;
  }

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2500,
  });
}


}

import { Component, OnInit } from '@angular/core';
import { HttpRentService } from '../rent/rent.service';
import { HttpBranchService } from '../branch/branch.service';
import { Router } from '@angular/router';
import { MdDialog, MdSnackBar } from '@angular/material';
import { Rent } from '../rent/rent.model';
import { HttpVehicleService } from '../vehicle/vehicle.service';

@Component({
  selector: 'app-allrents',
  templateUrl: './allrents.component.html',
  styleUrls: ['./allrents.component.css']
})
export class AllrentsComponent implements OnInit {

  public rents : Array<Rent>;
  constructor(private httpRentService : HttpRentService,private httpBranchService:HttpBranchService,
    private httpVehicleService : HttpVehicleService,
    private router: Router,
    public dialog:MdDialog,
    private snackBar: MdSnackBar) { }

  ngOnInit() {

    this.httpRentService.getRents().subscribe((res: any) => {
      this.rents = res; console.log(this.rents);
      this.setImagesForRent()
      for (let index = 0; index < this.rents.length; index++) {
        this.httpVehicleService.getVehicle(this.rents[index].Vehicle_Id).subscribe((res : any) => {
          this.rents[index].Vehicle = res;
        },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
        );
        
      }
    },
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    

  }
  setImagesForRent()
  {
    this.rents.forEach(element => {
      this.httpRentService.getImageUrlForRent(element.Id).subscribe(
        (result:any)=>{
          result=result.json();
          if(result!=undefined){
            var str=result.replace(/\\/g,"/");
            element.Image=str;
          }
        }
      );
  });
  }
 /* saveManager(rent:Rent){
    console.log(rent);
    this.httpRentService.saveManager(rent).subscribe(
      (res: any) => { 
        console.log("Rent approved.");
        this.snackBar.open("Manager banned.", "", { duration: 2500,});
      },
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

  }
*/
approve(rent :Rent){
  
  this.httpRentService.approveRent(rent).subscribe(
    ()=>{ 
      console.log('Approved successfully edited');
      this.snackBar.open("Approved successfully edited", "", { duration: 2500,});
    },
    error => {alert("Close!"); console.log(error);}
  );
}


}

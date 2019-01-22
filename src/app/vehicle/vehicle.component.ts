import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef,MdDialogConfig,MdSnackBar} from '@angular/material';
import {HttpVehicleService} from "./vehicle.service"
import {Vehicle} from "./vehicle.model";
import {VehicleAddComponent} from "./vehicle-add/vehicle-add.component"
import {VehicleEditComponent} from "./vehicle-edit/vehicle-edit.component"
import { HttpUsersService } from '../managers/users.service';
import { RentComponent } from '../rent/rent.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
  providers:[HttpVehicleService]
})
export class VehicleComponent implements OnInit {
  [x: string]: any;

  private vehicles:Array<Vehicle>;
  vehicle:Vehicle;
  private editFlag;
  public imageUrl:string;
  public count : number;
  private userUndefined:boolean;
  private adminRole:boolean;
  private managerRole:boolean;
  private managerBanned:boolean;
  private appUser:boolean;
  private role:string;

  constructor(private httpVehicleService:HttpVehicleService,
              private httpUsersService:HttpUsersService,
              public dialog:MdDialog,
              private snackBar:MdSnackBar) { }

  ngOnInit() {
     
    this.editFlag=false;
    this.adminRole=false;
    this.managerRole=false;
    this.appUser=false;
    this.userUndefined=true;
    this.createPermisions();

        this.httpVehicleService.getVehicles().subscribe(
          (res: any) => {
            this.vehicles = res; 
            console.log(this.vehicles);
            this.setImagesForVehicle();},
            error => {alert("Unsuccessful fetch operation!"); console.log(error);}
        );
  }

  setImagesForVehicle(){
    this.vehicles.forEach(element => {
        this.httpVehicleService.getLogoUrlForService(element.Id).subscribe(
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

  createPermisions(){
      this.role=localStorage.getItem('role');
      if(this.role=="Admin"){
          this.adminRole=true;
          this.userUndefined=false;
      }else if(this.role=="User"){
          this.appUser=true;
          this.userUndefined=false;
      }else if(this.role=="Manager"){
          this.managerRole=true;
          this.userUndefined=false;
          this.setUserManager();
      }
  }
  setUserManager(){
    this.httpUsersService.getUser(localStorage.getItem('username')).subscribe(
      (res: any) => {
        this.userManager=res;
        if(this.userManager.isBanned!=undefined){
            this.managerBanned=this.userManager.isBanned;
          }
        console.log(this.userManager);},
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  getNotification(evt) {
      this.ngOnInit();
  }

  editClick(vehicle:Vehicle){
    this.editFlag=true;
    this.vehicle=vehicle;
  }

  delete(vehicle:Vehicle){

    this.httpVehicleService.deleteVehicle(vehicle.Id).subscribe(
      ()=>{
        console.log('Vehicle ' + vehicle.CarModel + ' successfuly deleted');
        this.snackBar.open("Vehicle " + vehicle.CarModel + " successfuly deleted", "", { duration: 2500,});
        this.ngOnInit();
      },
      error=>{alert("Service ' + service.Name + ' failed delete!"); console.log(error);}
    );
  }

  openVehicleNewDialog(){
    let dialogRef = this.dialog.open(VehicleAddComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  
  editVehicleDialog(vehicle:Vehicle){
      let config = new MdDialogConfig();
      config.data = vehicle;

      let dialogRef = this.dialog.open(VehicleEditComponent,config);
      dialogRef.componentInstance.eVehicle = vehicle;
      dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  
  }
  rentVehicleDialog(vehicle:Vehicle)
  {
    let config = new MdDialogConfig();
    config.data = vehicle;
    config.height='530px';
    config.width='350px';

    let dialogRef = this.dialog.open(RentComponent,config);
    dialogRef.componentInstance.eVehicle = vehicle;
    dialogRef.afterClosed().subscribe(result => {
    this.ngOnInit();
  });
  }

}
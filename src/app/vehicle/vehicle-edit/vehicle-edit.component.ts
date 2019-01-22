import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Vehicle} from "../vehicle.model"
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef, MdDialogConfig,MdSnackBar} from '@angular/material';
import {AppComponent} from "../../app.component";
import {ImageuploadComponent} from "../../imageupload/imageupload.component";
import { HttpVehicleService } from '../vehicle.service';
import { Service } from '../../service/service.model';
import { TypeOfVehicle } from '../../vehicle-type/vehicleType.model';
import { HttpServiceService } from '../../service/service.service';
import { HttpVehicleTypeService } from '../../vehicle-type/vehicleType.service';


@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css'],
  providers:[HttpVehicleService]
})
export class VehicleEditComponent implements OnInit {

  private vehicleForEdit:Vehicle;
  public eVehicle : Vehicle;
  private role:string;
  private adminRole:boolean;
  public services: Array<Service>;
  public typesOfVehicle: Array<TypeOfVehicle>;

  constructor(private httpVehicleService:HttpVehicleService,
              public dialogRef: MdDialogRef<VehicleEditComponent>,
              private httpServiceService: HttpServiceService,
              private httpVehicleTypeService: HttpVehicleTypeService,
              private router:Router,
              public dialog:MdDialog,
              private snackBar:MdSnackBar)
               {
               
               }


  ngOnInit() {

    this.adminRole=false;
    this.createPermisions();
    this.httpServiceService.getServices().subscribe((res: any) => {
      this.services = res; console.log(this.services);
    },
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
    this.httpVehicleTypeService.getVehicleTypes().subscribe((res: any) => {
      this.typesOfVehicle = res; console.log(this.typesOfVehicle);
    },
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
      
  }

  createPermisions(){
    this.role=localStorage.getItem('role');
    if(this.role=="Admin"){
      this.adminRole=true;
    }
  }

  openChooseImagesDialog(){
    let config = new MdDialogConfig();
    config.height='530px';
    config.width='350px';

    let dialogRef = this.dialog.open(ImageuploadComponent,config);
    dialogRef.componentInstance.vehicle=this.eVehicle;
  }
  
  editVehicle(vehicle: Vehicle, form: NgForm){
    
      this.vehicleForEdit=new Vehicle();
      this.vehicleForEdit.Id=this.eVehicle.Id;
      this.vehicleForEdit.CarModel=vehicle.CarModel;
      this.vehicleForEdit.Description=vehicle.Description;
      this.vehicleForEdit.Year = vehicle.Year;
      this.vehicleForEdit.PricePerHour=vehicle.PricePerHour;
      this.vehicleForEdit.Image=vehicle.Image;
      this.vehicleForEdit.Manufactor = vehicle.Manufactor;
      this.vehicleForEdit.Service_Id = vehicle.Service_Id;
      this.vehicleForEdit.TypeOfVehicle_Id=vehicle.TypeOfVehicle_Id;
     
      if (this.adminRole)
      this.vehicleForEdit.Available = vehicle.Available;
      else  
      this.vehicleForEdit.Available = this.eVehicle.Available;
  

      this.httpVehicleService.editVehicle(this.vehicleForEdit).subscribe(
          ()=>{ 
            console.log('Vehicle successfully edited');
            this.snackBar.open("Vehicle successfully edited", "", { duration: 2500,});
            this.dialogRef.close();
          },
          error => {alert("Close!"); console.log(error);}
        );
    
  }

}
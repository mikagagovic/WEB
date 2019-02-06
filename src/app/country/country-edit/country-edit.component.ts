import { Component, OnInit } from '@angular/core';
import { Country } from '../country.model';
import { HttpCountryService } from '../country.service';
import { MdDialogRef, MdDialog, MdSnackBar, MdDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { ImageuploadComponent } from '../../imageupload/imageupload.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.css']
})
export class CountryEditComponent implements OnInit {
  private countryForEdit:Country;
  public eCountry : Country;
  private role:string;
  private adminRole:boolean;

  constructor(private httpCountryService:HttpCountryService,
              public dialogRef: MdDialogRef<CountryEditComponent>,
              private router:Router,
              public dialog:MdDialog,
              private snackBar:MdSnackBar)
               {
               
               }


  ngOnInit() {

    this.adminRole=false;
    this.createPermisions();
      
  }

  createPermisions(){
    this.role=localStorage.getItem('role');
    if(this.role=="Admin"){
      this.adminRole=true;
    }
  }

  openChangeFlagDialog(){
    let config = new MdDialogConfig();
    config.height='530px';
    config.width='350px';

    let dialogRef = this.dialog.open(ImageuploadComponent,config);
    dialogRef.componentInstance.country=this.eCountry;
  }
  
  editCountry(country: Country, form: NgForm){
    
      this.countryForEdit=new Country();
      this.countryForEdit.Id=this.eCountry.Id;
      this.countryForEdit.Name=this.eCountry.Name;
      this.countryForEdit.Registration=this.eCountry.Registration;
      this.countryForEdit.CallNumber=this.eCountry.CallNumber;
      this.countryForEdit.Flag=this.eCountry.Flag;


      this.httpCountryService.editCountry(this.countryForEdit).subscribe(
          ()=>{ 
            console.log('Country successfully edited');
            this.snackBar.open("Country successfully edited", "", { duration: 2500,});
            this.dialogRef.close();
          },
          error => {alert("Close!"); console.log(error);}
        );
    
       
  }

}

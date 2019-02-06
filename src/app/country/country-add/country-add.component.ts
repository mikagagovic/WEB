import { Component, OnInit } from '@angular/core';
import { Country } from '../country.model';
import { HttpCountryService } from '../country.service';
import { Router } from '@angular/router';
import { MdDialogRef, MdDialog, MdSnackBar, MdDialogConfig } from '@angular/material';
import { ImageuploadComponent } from '../../imageupload/imageupload.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css']
})
export class CountryAddComponent implements OnInit {
  nCountry:any={};
  private postCountry:Country;

  constructor(private httpCountryService:HttpCountryService,
              private router: Router,
              public dialogRef: MdDialogRef<CountryAddComponent>,
              public dialog:MdDialog,
              private snackBar:MdSnackBar) { }

  ngOnInit() {
    
  }

  openChooseFlagDialog(){
    let config = new MdDialogConfig();
    config.height='530px';
    config.width='350px';

    let dialogRef = this.dialog.open(ImageuploadComponent,config);
    dialogRef.componentInstance.country=this.nCountry;
  }

  saveCountry(country: Country, form: NgForm){
       this.postCountry=new Country();
       this.postCountry.Name=country.Name;
       this.postCountry.Flag=country.Flag;
       this.postCountry.CallNumber=country.CallNumber;
       this.postCountry.Registration=country.Registration;

       this.httpCountryService.postCountry(this.postCountry).subscribe(
          ()=>{ 
            console.log('Country successfuly posted');
            this.snackBar.open("Country successfuly posted.", "", { duration: 2500,});
            this.router.navigate(['/country']);
            this.dialogRef.close();
          },
          error => {alert("Close!"); console.log(error);}
        );
       
  }

}
import { Component, OnInit } from '@angular/core';
import { Country } from './country.model';
import { MdDialog, MdSnackBar, MdDialogConfig } from '@angular/material';
import { CountryAddComponent } from './country-add/country-add.component';
import { CountryEditComponent } from './country-edit/country-edit.component';
import { HttpCountryService } from './country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  private countries:Array<Country>;
  private editFlag:boolean;
  private adminRole:boolean;
  private role:string;
  constructor(private httpCountryService:HttpCountryService,
              private snackBar:MdSnackBar,
              public dialog:MdDialog) 
  {
  }
    
  ngOnInit() {
    this.editFlag = false;
    this.adminRole=false;
    this.createPermisions();
    this.httpCountryService.getCountries().subscribe(
      (res: any) => {
        this.countries = res; console.log(this.countries);
        this.setImagesForCountries();
      },
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  setImagesForCountries(){
    
    this.countries.forEach(element => {
        this.httpCountryService.getFlagUrlForCountry(element.Id).subscribe(
          (result:any)=>{
            result=result.json();
            if(result!=undefined){
              var str=result.replace(/\\/g,"/");
              element.Flag=str;
            }
          }
        );
    });
  }

  createPermisions(){
    this.role=localStorage.getItem('role');
      if(this.role=="Admin"){
          this.adminRole=true;
      }
  }
  openNewCountryDialog(){
    let dialogRef = this.dialog.open(CountryAddComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  editCountryDialog(country:Country){
    let config = new MdDialogConfig();
      config.data = country;

      let dialogRef = this.dialog.open(CountryEditComponent,config);
      dialogRef.componentInstance.eCountry = country;
      dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      });
  }

  delete(country:Country){

    this.httpCountryService.deleteCountry(country.Id).subscribe(
      ()=>{
      console.log('Country ' + country.Name + ' successfuly deleted');
      this.snackBar.open("Country " + country.Name + " successfuly deleted", "", { duration: 2500,});
      this.ngOnInit();
      },
      error=>{alert('Country ' + country.Name + ' failed delete!'); console.log(error);}
    );
  }
}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cmpyNames:any;
  profileForm:FormGroup;
  stockDetails:any;
  isResultClicked:boolean=false;
  submitted:boolean=false;
  
  constructor(private stockService:StockService,private datepipe: DatePipe,private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      companyCode: ['',Validators.required],
      startDate:['',Validators.required],
      endDate:['',Validators.required]
   });
    this.stockService.getCompanyDetails().subscribe(res=>{
     this.cmpyNames=res;
    })
    
  }
  
  onNameChange(){
    this.isResultClicked=false;
  }

  OnGetResultClick(){
    console.log("I am called")
    this.submitted=true;
    if (this.profileForm.invalid) {
      return;
    }
    let start_date =this.datepipe.transform(this.profileForm.get('startDate').value, 'dd-MMMM-yyyy');
    let end_Date=this.datepipe.transform(this.profileForm.get('endDate').value, 'dd-MMMM-yyyy');
    if(end_Date<start_date){
      this.profileForm.controls['endDate'].setErrors({endGt:true});
      return;
    }
    this.stockService.getStockDetails(this.profileForm.get('companyCode').value,start_date,end_Date).subscribe(res=>{
      this.stockDetails=res;
      this.isResultClicked=true;
     })
  }

  get f() { console.log(this.profileForm.controls);return this.profileForm.controls; }
}

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
  maxValue:any;
  minValue:any;
  avgValue:any;
  
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
    this.submitted=true;
    if (this.profileForm.invalid) {
      return;
    }
    let start_date =this.datepipe.transform(this.profileForm.get('startDate').value, 'dd-MMMM-yyyy');
    let end_Date=this.datepipe.transform(this.profileForm.get('endDate').value, 'dd-MMMM-yyyy');
    if(Date.parse(this.profileForm.get('startDate').value)>Date.parse(this.profileForm.get('endDate').value)){
      this.profileForm.controls['endDate'].setErrors({endGt:true});
      return;
    }
    this.stockService.getStockDetails(this.profileForm.get('companyCode').value,start_date,end_Date).subscribe(res=>{
      this.stockDetails=res;
      if(res.length>0){
      this.maxValue = Math.max(...res.map(o=>o.StockPrice));
      this.minValue= Math.min(...res.map(x=>x.StockPrice));
      this.avgValue = res.reduce((total, next) => total + next.StockPrice, 0) / res.length;
      }
      this.isResultClicked=true;
     })
  }

  get f() { return this.profileForm.controls; }
}

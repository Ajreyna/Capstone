import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  public sales: Sales[];
  public newSales: Sales = {firstName:'', lastName:'', isAvailable: true};

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

   }

 async ngOnInit() {
   this.sales = await this.http.get<Sales[]>(this.baseUrl + 'sales').toPromise();
  }

  async save() {
    await this.http.post<Sales[]>(this.baseUrl + 'sales', this.newSales).toPromise();
    this.newSales = {firstName: '', lastName:'', isAvailable: true};
    this.sales = await this.http.get<Sales[]>(this.baseUrl + 'sales').toPromise();
  }

}

interface Sales{
  firstName: string;
  lastName: string;
  isAvailable: boolean;
}
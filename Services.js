0. npm i json-server --save

   mkdir server && cd server

   touch server/db.json

   Once the db.json file is created then add some data in it
   
   {
  "employees": [{
    "id": 1,
    "name": "Tony Stark",
    "email": "tony@mcu.com",
    "phone": "001-123-4567"
  }, {
    "id": 2,
    "name": "Black Widow",
    "email": "black-widow@mcu.com",
    "phone": "001-123-4568"
  }]
}

json-server --watch server/db.json

http://localhost:3000/employees

1. app.module.ts 

import { HttpClientModule } from '@angular/common/http';

 @NgModule({
  imports: [
    HttpClientModule
   ]
})


2. In order to create CRUD operations using RESTful API in Angular 7, 
   we need to generate employee.ts class and rest-api.service.ts files.
   
   ng g cl shared/Employee
   
   
 3. export class Employee {
   id: string;
   name: string;
   email: string;
   phone: number;
}


4. Generate RestApiService Class


ng g s shared/rest-api



5. I will be writing down core logic in this file for consuming RESTful API using HttpClient API.
   We will also use RxJS to handle asynchronous operations and errors in this demo app.

  Let’s go to shared/rest-api.service.ts file and add the following code.


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../shared/employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  
  // Define API
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch employees list
  getEmployees(): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + '/employees')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch employee
  getEmployee(id): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + '/employees/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API post() method => Create employee
  createEmployee(employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiURL + '/employees', JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API put() method => Update employee
  updateEmployee(id, employee): Observable<Employee> {
    return this.http.put<Employee>(this.apiURL + '/employees/' + id, JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete employee
  deleteEmployee(id){
    return this.http.delete<Employee>(this.apiURL + '/employees/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

}



6. Access HttpClient API from Angular 7 Component

 app.module.ts
 
 import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// HttpClient module for RESTful API
import { HttpClientModule } from '@angular/common/http';

// Routing module for router service
import { AppRoutingModule } from './app-routing.module';

// Forms module
import { FormsModule } from '@angular/forms';

// Components
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }



7. employee-create.component.html


<div class="container custom-container">
  <div class="col-md-12">
    <h3 class="mb-3 text-center">Create Employee</h3>

    <div class="form-group">
      <input type="text" [(ngModel)]="employeeDetails.name" class="form-control" placeholder="Name">
    </div>

    <div class="form-group">
      <input type="text" [(ngModel)]="employeeDetails.email" class="form-control" placeholder="Email">
    </div>

    <div class="form-group">
      <input type="text" [(ngModel)]="employeeDetails.phone" class="form-control" placeholder="Phone">
    </div>

    <div class="form-group">
      <button class="btn btn-success btn-lg btn-block" (click)="addEmployee()">Create Employee</button>
    </div>

  </div>
</div>



8. employee-create.component.ts


import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  @Input() employeeDetails = { name: '', email: '', phone: 0 }

  constructor(
    public restApi: RestApiService, 
    public router: Router
  ) { }

  ngOnInit() { }

  addEmployee(dataEmployee) {
    this.restApi.createEmployee(this.employeeDetails).subscribe((data: {}) => {
      this.router.navigate(['/employees-list'])
    })
  }

}


9. Send HTTP GET and DELETE Requests in Angular 7 to Manage Employees List

employees-list.component.html

<div class="container custom-container-2">

  <!-- Show it when there is no employee -->
  <div class="no-data text-center" *ngIf="Employee.length == 0">
    <p>There is no employee added yet!</p>
    <button class="btn btn-outline-primary" routerLink="/create-employee">Add Empoyee</button>
  </div>

  <!-- Employees list table, it hides when there is no employee -->
  <div *ngIf="Employee.length !== 0">
    <h3 class="mb-3 text-center">Employees List</h3>

    <div class="col-md-12">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">User Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let employee of Employee">
            <td>{{employee.id}}</td>
            <td>{{employee.name}}</td>
            <td>{{employee.email}}</td>
            <td>{{employee.phone}}</td>
            <td>
              <span class="edit" routerLink="/employee-edit/{{employee.id}}">Edit</span>
              <span class="delete" (click)="deleteEmployee(employee.id)">Delete</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>

</div>


10. employees-list.component.ts

import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  Employee: any = [];

  constructor(
    public restApi: RestApiService
  ) { }

  ngOnInit() {
    this.loadEmployees()
  }

  // Get employees list
  loadEmployees() {
    return this.restApi.getEmployees().subscribe((data: {}) => {
      this.Employee = data;
    })
  }

  // Delete employee
  deleteEmployee(id) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.restApi.deleteEmployee(id).subscribe(data => {
        this.loadEmployees()
      })
    }
  }  

}


11. Make HTTP PUT Request in Angular 7 to Update Data

I am going to send HTTP PUT Request in Angular 7 to update current employee data in our little demo app, 
It’s pretty simple just follow the following steps.


employee-edit.component.html

<div class="container custom-container">
  <div class="col-md-12">
    
    <h3 class="mb-3 text-center">Update Employee</h3>

    <div class="form-group">
      <input type="text" [(ngModel)]="employeeData.name" class="form-control" placeholder="Name">
    </div>

    <div class="form-group">
      <input type="text" [(ngModel)]="employeeData.email" class="form-control" placeholder="Email">
    </div>

    <div class="form-group">
      <input type="text" [(ngModel)]="employeeData.phone" class="form-control" placeholder="Phone">
    </div>

    <div class="form-group">
      <button class="btn btn-success btn-lg btn-block" (click)="updateEmployee()">Update Employee</button>
    </div>
    
  </div>
</div>



employee-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})

export class EmployeeEditComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  employeeData: any = {};

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { 
  }

  ngOnInit() { 
    this.restApi.getEmployee(this.id).subscribe((data: {}) => {
      this.employeeData = data;
    })
  }

  // Update employee data
  updateEmployee() {
    if(window.confirm('Are you sure, you want to update?')){
      this.restApi.updateEmployee(this.id, this.employeeData).subscribe(data => {
        this.router.navigate(['/employees-list'])
      })
    }
  }

}










1. Hello wordld 

2. if, if else, switch and for loop 

3. data binding (all kinds of)

4. event binding 

5. pipes 

6. create custom pipes

7. how to use directives 

8. create custom directives

9. parent to child data transfer

10. child to parent data transfer

11. create models

12. creat services with hello program

13. from exapmle templet driven from, reactive from with from group and also with from builder

14. routing 

15. routing for  child component

16. httpclient model and rxjs operater

17. crud demo with fake rest api

18. authentication with login and registration

19. crud example with image, file upload with session managment

20. pagination example

21. data table example

22. email configration example

23. dashboard intrigation with andmin and user based


Track control state and validity with ngModel
-----------------------------------------------------------------------
State 				class if true 		class if false
-----------------------------------------------------------------------

the control has been visited.    ng-touched         ng-untouched
the control's value has changed  ng-dirty           ng-pristine
the control's value is vadid     ng-valid           ng-invalid

-----------------------------------------------------------------------

## if else condition ng-template
------------------------------

```ts

*ngIf = "n%2 == 0; then conditon1 else condition2"

 <div>
    <span *ngIf = "isavailable; then condition1 else condition2">
       Condition is valid.
    </span>
    <ng-template #condition1>Condition is valid</ng-template>
    <ng-template #condition2>Condition is invalid</ng-template>
 </div>
 
```

## for loop

```ts

<option *ngFor = "let i of months">{{i}}</option>

```

## Event Binding

```ts

<button (click) = "myClickFunction($event)">
    Click Me
 </button>
 
 myClickFunction(event: any) {
  console.log(event);
}

```

## pipe

```ts

{{ Welcome to Angular 7 | lowercase}}

{{title | uppercase}}

{{6589.23 | currency:"USD"}}

{{6589.23 | currency:"USD":true}} // Boolean true is used to get the sign of the currency.

{{todaydate | date:'d/M/y'}}	

{todaydate | date:'shortTime'}}
  
Decimal Pipe <b>{{ 454.78787814 | number: '3.4-4' }}</b> // 3 is for main integer, 4 -4 are for integers to be displayed. 
  
{{ jsonval | json }}
	  
{{00.54565 | percent}}
	  
{{months | slice:2:6}} // here 2 and 6 refers to the start and the end index

```

## Custom Pipe

```ts

app.sqrt.ts

import {Pipe, PipeTransform} from '@angular/core'; 
@Pipe ({ 
   name : 'sqrt'
}) 

export class SqrtPipe implements PipeTransform {
   transform(val : number) : number {
      return Math.sqrt(val);
   }
}

```


## Create Custom Directives

**ng g directive changeText**

```ts

import in app.model file

import { ChangeTextDirective } from './change-text.directive';

also need to add in declaration section 

ChangeTextDirective 

this is a file change-text.directive

import { Directive, ElementRef} from '@angular/core';
@Directive({
   selector: '[changeText]'
})

export class ChangeTextDirective {
   constructor(Element: ElementRef) {
      console.log(Element);
      Element.nativeElement.innerText = "Text is changed by changeText Directive.";
   }
}


```

## Routing

``` typescript

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'lazymodule', loadChildren: './lazymodule/lazymodule.module#LazyModuleModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## Lazy loading in angular 8
``` typescript
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
},
```

## Reactive Form


**first of all import this line in app.module.ts **

```ts
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
```
  
```ts
import { FormGroup, FormControl } from '@angular/forms';

  employeeForm: FormGroup; 

    ngOnInit() {
    this.employeeForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl()

    });
	 
  onSubmit(): void {
    console.log(this.employeeForm.value);
    console.log(this.employeeForm.get('fullName').value);
  }


  <form [formGroup] = "employeeForm" (ngSubmit) = "onSubmit()">
  
    <input type="text" class="form-control" formControlName="fullName">
  
    <button type="submit">Submit Data</button>
  
  </form>

  ```

### using this fuction we can show fullName value in ts file

```ts

this.employeeForm.get('fullName').value

```
 
### Using this line code we can show data to from html page

```html

Touched : {{ employeeForm.touched }}

Dirty : {{ employeeForm.dirty }}

Valid : {{ employeeForm.valid }}

Form Values : {{ employeeForm.value | json }}

Touched : {{ employeeForm.get('fullName').touched }}

Dirty : {{ employeeForm.get('fullName').dirty }}

Valid : {{ employeeForm.get('fullName').valid }}

Full Name value : {{ employeeForm.get('fullName').value }}

```
 


```ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  apiURL = 'http://localhost:2020';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User> {
    return this.http.get<User>(this.apiURL + '/user')
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.apiURL + '/user/' + id)
  }

  createUser(user): Observable<User> {
    return this.http.post<User>(this.apiURL + '/user', JSON.stringify(user))
  }

  updateUser(id, user): Observable<User> {
    return this.http.put<User>(this.apiURL + '/user/' + id, JSON.stringify(user))
  }

  deleteUser(id) {
    return this.http.delete<User>(this.apiURL + '/user/' + id);
  }

}

```

Calling services in component 

```ts
 constructor(public userApi: UserService) { }

ngOnInit() {
    this.userApi.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

```

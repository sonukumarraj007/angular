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
 

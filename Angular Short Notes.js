
Track control state and validity with ngModel
-----------------------------------------------------------------
State 				class if true 		class if false
----------------------------------------------------------------

the control has been visited.    ng-touched         ng-untouched
the control's value has changed  ng-dirty           ng-pristine
the control's value is vadid     ng-valid           ng-invalid

--------------------------------------------------------------


Adding headers

import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

Updating headers

httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');


Sending data to the server

Making a POST request

/** POST: add a new hero to the database */
addHero (hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    .pipe(
      catchError(this.handleError('addHero', hero))
    );
}



-----------------------------------------------------------------------------------------------------


------------------------------
1. app.module.ts
------------------------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }

------------------------------
2. app-routing.module.ts
------------------------------

import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];
@NgModule({ 
   imports: [RouterModule.forRoot(routes)], 
   exports: [RouterModule] 
}) 
export class AppRoutingModule { }

------------------------------
3. main.ts
------------------------------

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; 
import { environment } from './environments/environment';

if (environment.production) { 
   enableProdMode(); 
}
platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

------------------------------
4. for loop
------------------------------

   <option *ngFor = "let i of months">{{i}}</option> 
	
------------------------------
5. if else condition ng-template
------------------------------

<div>
    <span *ngIf = "isavailable; then condition1 else condition2">
       Condition is valid.
    </span>
    <ng-template #condition1>Condition is valid</ng-template>
    <ng-template #condition2>Condition is invalid</ng-template>
 </div>
 
 
 *ngIf = "n%2 == 0; then conditon1 else condition2"
------------------------------
6. Event Binding
------------------------------

<button (click) = "myClickFunction($event)">
    Click Me
 </button>
 
 myClickFunction(event: any) {
  //just added console.log which will display the event details in browser on click of the button.
  alert("Button is clicked");
  console.log(event);
}
 
------------------------------
7. Create Custom Directives
------------------------------

ng g directive changeText

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


Nodte: In the above file, there is a class called ChangeTextDirective and a constructor, which takes the element of 
type ElementRef, which is mandatory. The element has all the details to which the Change Text directive is applied.

We have added the console.log element. The output of the same can be seen in the browser console. The text of the 
element is also changed as shown above.


------------------------------
8. pipe
------------------------------

{{ Welcome to Angular 7 | lowercase}}

{{title | uppercase}}

{{6589.23 | currency:"USD"}}

{{6589.23 | currency:"USD":true}}
      // Boolean true is used to get the sign of the currency.

{{todaydate | date:'d/M/y'}}	

{todaydate | date:'shortTime'}}

  
Decimal Pipe
      <b>{{ 454.78787814 | number: '3.4-4' }}</b> 
      // 3 is for main integer, 4 -4 are for integers to be displayed. 

	  
{{ jsonval | json }}
	  
{{00.54565 | percent}}
	  
{{months | slice:2:6}}
      // here 2 and 6 refers to the start and the end index

	  
------------------------------
9. Custom Pipe
------------------------------

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

import { SqrtPipe } from './app.sqrt';


import { SqrtPipe } from './app.sqrt';

------------------------------
10. Routing
------------------------------
------------------------------
------------------------------
------------------------------
------------------------------
------------------------------
------------------------------
------------------------------
------------------------------
------------------------------
------------------------------
------------------------------
------------------------------
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	






How to create module

1. create file ts file with the name
  
   app.module_name.module.ts
   
2. import { NgModule } from '@angular/core'; 
  
   write code
   
3. where ever you want, u can import suppose importing in app.module.ts file

   import { AppModule_NameModule } from 'src/app/app.common.module';
   
4.  add  AppModule_NameModule in imporat section

Template driven form

1. <!-- <div class="form-group">
  <label>Name</label>
  <input type="text" class="form-control" [class.is-invalid]="name.invalid && name.touched"
    [(ngModel)]="userModel.name" name="name" #name="ngModel" required />
      <small [class.d-none]="name.valid || name.untouched" class="text-danger">Please Enter Name:</small>
</div>

<div class="form-group">
  <label>Email</label>
  <input type="email" class="form-control" name="userEmail" [(ngModel)]="userModel.userEmail" #userEmail="ngModel"
   [class.is-invalid]="userEmail.invalid && userEmail.touched" required
   pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$" maxlength="25" minlength="10"/>
   <div *ngIf="userEmail.errors && (userEmail.invalid || userEmail.touched)">
    <small class="text-danger" *ngIf="userEmail.errors.required">Email is required</small>
    <small class="text-danger" *ngIf="userEmail.errors.pattern">Email Is incorrect</small>
    <small class="text-danger" *ngIf="userEmail.errors.minlength">Email must be 10 character</small>
    <small class="text-danger" *ngIf="userEmail.errors.maxlength">Email can not be more than 25 char</small>
  </div>
</div>


<div class="form-group">
  <label>Phone</label>
  <input type="number" class="form-control" name="phone" [(ngModel)]="userModel.phone" #phone="ngModel"
   [class.is-invalid]="phone.invalid && phone.touched" required pattern="^\d{10}$" />
   <div *ngIf="phone.errors && (phone.invalid || phone.touched)">
    <small class="text-danger" *ngIf="phone.errors.required">Phone number is required</small>
    <small class="text-danger" *ngIf="phone.errors.pattern">Phone number must be 10 digits</small>
  </div>
</div> -->



<div class="container-fluid">
  <h2>Bootcamp Enrollment Form</h2>

  <form #userForm="ngForm" *ngIf="!submitted" (ngSubmit)="onSubmit()" novalidate>
    <div class="form-group">
      <label>Name</label>
      <input type="text" #name="ngModel" required class="form-control" [class.is-invalid]="name.invalid && name.touched"
        name="name" [(ngModel)]="userModel.name" />
      <small class="text-danger" [class.d-none]="name.valid || name.untouched">Name is required</small>
    </div>

    <div class="form-group">
      <label>Email</label>
      <input type="email" class="form-control" name="email" [(ngModel)]="userModel.email" />
    </div>

    <div class="form-group">
      <label>Phone</label>
      <input type="tel" #phone="ngModel" required pattern="^\d{10}$" class="form-control"
        [class.is-invalid]="phone.invalid && phone.touched" name="phone" [(ngModel)]="userModel.phone" />
      <!-- <small class="text-danger" [class.d-none]="phone.valid || phone.untouched">Phone number must be 10 digits</small> -->
      <div *ngIf="phone.errors && (phone.invalid || phone.touched)">
        <small class="text-danger" *ngIf="phone.errors.required">Phone number is required</small>
        <small class="text-danger" *ngIf="phone.errors.pattern">Phone number must be 10 digits</small>
      </div>
    </div>

	
	
	
    <div class="form-group">
      <select class="custom-select" (blur)="validateTopic(topic.value)" (change)="validateTopic(topic.value)"
        #topic="ngModel" [class.is-invalid]="topicHasError && topic.touched" name="topic" [(ngModel)]="userModel.topic">
        <option value="default">I am interested in</option>
        <option *ngFor="let topic of topics">{{ topic }}</option>
      </select>
      <small class="text-danger" [class.d-none]="!topicHasError || topic.untouched">Please choose a topic</small>
    </div>

	
	
    <div class="mb-3">
      <label>Time preference</label>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="timePreference" value="morning"
          [(ngModel)]="userModel.timePreference" />
        <label class="form-check-label">Morning (9AM - 12PM)</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="timePreference" value="evening"
          [(ngModel)]="userModel.timePreference" />
        <label class="form-check-label">Evening (5PM - 8PM)</label>
      </div>
    </div>

    <div class="form-check mb-3">
      <input class="form-check-input" type="checkbox" name="subscribe" [(ngModel)]="userModel.subscribe" />
      <label class="form-check-label">
        Send me promotional offers
      </label>
    </div>

    <button class="btn btn-primary" [disabled]="userForm.form.invalid || topicHasError" type="submit">
      Submit form
    </button>
  </form>
  <div class="alert alert-danger" *ngIf="errorMsg">
    {{ errorMsg }}
  </div>
</div>


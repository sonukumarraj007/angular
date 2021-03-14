--->> Reactive Form

1. first of all import this line in app.module.ts

import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';


2. in imports section app.module.ts file 

  ReactiveFormsModule
  
  FormsModule
  
  
3. Now in form Page ts file import

import { FormGroup, FormControl } from '@angular/forms';


4. Create employeeForm: FormGroup; refrence

5.   ngOnInit() {
    this.employeeForm = new FormGroup({

      fullName: new FormControl(),
      email: new FormControl()

    });
	
6.  onSubmit(): void {
    console.log(this.employeeForm.value);
    console.log(this.employeeForm.get('fullName').value);
  }

 7. Now in form page componet page
 
  <form [formGroup] = "employeeForm" (ngSubmit) = "onSubmit()">
  
  <input type="text" class="form-control" formControlName="fullName">
  
  <button type="submit">Submit Data</button>
  
  </form>

8. this.employeeForm.get('fullName').value

 using this fuction we can show fullName value in ts file
 
 
 9. Using this line code we can show data to from html page

Touched : {{ employeeForm.touched }}

Dirty : {{ employeeForm.dirty }}

Valid : {{ employeeForm.valid }}


Form Values : {{ employeeForm.value | json }}


Touched : {{ employeeForm.get('fullName').touched }}

Dirty : {{ employeeForm.get('fullName').dirty }}

Valid : {{ employeeForm.get('fullName').valid }}

Full Name value : {{ employeeForm.get('fullName').value }}






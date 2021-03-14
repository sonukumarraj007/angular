
--------------------------------------------------------------------------------

npm install -g json-server 

json-server --watch db.json --port 2020

npm install primeng --save

npm install primeicons --save

npm install @angular/animations --save

npm install @angular/cdk --save

npm install bootstrap --save

npm install jquery --save  

npm install --save @types/node  

npm install --save font-awesome angular-font-awesome


 angular.json

  "node_modules/font-awesome/css/font-awesome.css"
  "node_modules/primeng/resources/themes/nova-light/theme.css",
  "node_modules/primeng/resources/primeng.min.css",
  "node_modules/primeicons/primeicons.css",
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/font-awesome/css/font-awesome.css"


  "node_modules/jquery/dist/jquery.min.js",
  "node_modules/bootstrap/dist/js/bootstrap.js",



---------------------------------------------------------------------------------------------------------------------------------------------

1. node --version               :  will show the installed node version


2. npm --vesrion                :  will show the installed npm version


3. npm install                  :  will install all required package


3. npm install -f               :  will install all required package with force fully


4. npm install -g @angular/cli  :  will install angular cli globally

   
5. ng --version                 :  will show installed angular cli version


6. ng new my-dream-app          :  will create new angular project file


7. ng serve                     :  will start server and run the application


8. ng generate                  :  will use for generating component, directives, modules, router, pipes and services


   for example: ng g c test, ng g d custom_directives
	

9. Test, Lint                   :  Run your unit tests, your end-to-end tests, or execute the official Angular linter with the breeze of a command.
	
	
10. npm uninstall -g angular-cli             :  will uninstall angular cli


11. npm cache clean --force                  : will clear cache forcelly


12. npm install -g @angular/cli@latest       : will installed latest version of angular cli

	
13. npm run build                            :  build the application


14. npm install -g json-server               : will installed json server globally


15.   : will start json server on port number 3004


16. npm audit fix --force   : will fixed the vunarable file


17. grunt                   :  build the application 


18. npm install -g yarn     : will installed yarn globally


19. yarn --version          : show yarn version 


20. ng g c folderName/SubFolder/.../componentName --skipTests=true : this is for generating without spec file


21. ng g c test --flat                                          : this is for generating without folder

22. ng g component component-name --skip-import
              


Minimalist Angular Cli generate example

ng g c hero-component --flat -it -is --skipTests

-is for inline css, preventing style file creation
--flat to prevent folder creation
-it for inline template, preventing html file creation
--skipTests to prevent .spec file creation

----------------------------------------------------------------------------------------------------------------

*************************************** Angular Project folder structure ***************************************

----------------------------------------------------------------------------------------------------------------


e2e : end to end test folder. Maily e2e is used for integration testing and helps ensure the applicatin works file.


node_modules : the npm package installed is node_modules. You can open the folder and  see the package available.


src : this folder is where we will work on the project using angular 7 . Inside src/ you will  app/ folder created during the project setup and holds all the required files required for the project.



angular.json − It basically holds the project name, version of cli, etc.


.editorconfig − This is the config file for the editor.


.gitignore − A .gitignore file should be committed into the repository, in order to share the ignore rules with any other users that clone the repository.


package.json − The package.json file tells which libraries will be installed into node_modules when you run npm install.


tsconfig.json − This basically contains the compiler options required during compilation.


tslint.json − This is the config file with rules to be considered while compiling.



@NgModule is imported from @angular/core and it has object with following properties −


Declarations − In declarations, the reference to the components is stored. The App component is the default component that is created whenever a new project is initiated. We will learn about creating new components in a different section.


Imports − This will have the modules imported as shown above. At present, BrowserModule is part of the imports which is imported from @angular/platform-browser. There is also routing module added AppRoutingModule.


Providers − This will have reference to the services created. The service will be discussed in a subsequent chapter.


Bootstrap − This has reference to the default component created, i.e., AppComponent.


---------------------------------------------------------------------------------------------------------------------------------------------

 1. EditorConfig for VS Code
 
 2. TSLint
 
 3. GitLens 
 
 4. CSS Peek
 
 5. Debuger chrome

 6. Copy/Paste Detector

 7. angular 8 snipe type scriopt

 8. Path Intellisense


<div *ngIf=" 5>2; then thenBlock else elseBlock"></div>
<ng-template #thenBlock>Content to render when condition is true.</ng-template>
<ng-template #elseBlock>Content to render when condition is false.</ng-template>



// for (let i = 0; i < JSON.stringify(this.vinList, ['vin']).length; i++) {
      //   console.log(this.vinList[i].vin);

      //   this.newArr.push(this.vinList[i].vin);
      }
      // console.log(data);
      // console.log((JSON.stringify(data, ['vin'])));




    <div class="form-group ui-fluid">
                                    <label for="sel1">Impact :</label>
                                    <select class="form-control" onchange="this.className=this.options[this.selectedIndex].className" class="greenText">
                                    <option class="greenText" value="apple" >Penalty</option>
                                    <option class="redText"   value="banana" >Sales stop small volume</option>
                                    <option class="blueText"  value="grape" >recall/sales stop high volume</option>
                                    <option class="redText"   value="banana" >business risk</option>
                                    </select>
                                </div>


   <p>selected Impact: {{onePagerForm.get('impact').value}}</p>




//  alert('Selected value :' +  JSON.stringify(this.brand, ['id']));


[ngClass]="'tdbg'"

[ngClass]="'tablebg'"



    this.data = [
      { date: new Date("2018-07-12"), title: "Test1", type: "123", comment: "" },
      { date: new Date("2018-07-13"), title: "Test2", type: "123", comment: "" }
    ];

    this.cols = [
      { field: 'date', header: 'Date' },
      { field: 'title', header: 'Title' },
      { field: 'type', header: 'Type' },
      { field: 'comment', header: 'Comment' }
    ];

	
	
	<p-calendar [(ngModel)]="value" showTime="true" hourFormat="12"></p-calendar>
	
	<p-calendar ... dataType="string" dateFormat="M dd, yy" [showTime]="true" [hourFormat]="24" ...
	
	<p-calendar [(ngModel)]="endTime" dataType="string" timeOnly="true" hourFormat="24"
[showIcon]="true"></p-calendar>

<p-calendar [(ngModel)]="mySelection" dataType="string" [showTime]="true"></p-calendar
<span>Display the date and time selected: {{mySelection}}</span>



<p-calendar [(ngModel)]="time_24h" [timeOnly]="true" [showTime]="true" [hourFormat]="24" (onSelect)="onChangeTime($event)"></p-calendar>

onChangeTime($event:any){
    console.log(this.convertTime($event));
}
convertTime(str:string) {
      var date = new Date(str),
      mnth = ("0" + (date.getMonth()+1)).slice(-2),
      day  = ("0" + date.getDate()).slice(-2),
      hours  = ("0" + date.getHours()).slice(-2),
      minutes = ("0" + date.getMinutes()).slice(-2);
      return [hours, minutes].join(":");
}


<p-calendar class="filing-time-input" name="filingTime" [(ngModel)]="filingTime" ngDefaultControl dateFormat="mm/dd/yy" timeFormat="HH:mm:ss" [timeOnly]="true"></p-calendar>

	
	
<p-calendar [(ngModel)]="value" showTime="showTime" hourFormat="24" [utc]="true"></p-calendar>
<span>{{ value|json }}</span>


	
	this.minDateValue = new Date();
this.maxDateValue = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

	
	<p-calendar [(ngModel)]="dateValue" dateFormat="dd.mm.yy" [disabledDates]="[here are the dates]"></p-calendar>
	
	
	
	<div class="form-group">
  <label for="Effective">Effective Date</label>
  <p-calendar  [(value)]="effective" dateFormat="mm/dd/yy" defaultDate="+3w"></p-calendar>
</div>


	
	<p-calendar [(ngModel)]="date" [showTime]="true" ngClass="ui-calendar-custom" dateFormat="MM d, yy"></p-calendar>
	
	
	
	<p-calendar  [(ngModel)]="bin.bidinstalledfrom" dateFormat="dd/mm/yy" 
[showTime]="true"  autocomplete="off" required name="BIDInstalledFrom" 
id="installedfrom" class="col-md-12"  ></p-calendar>




<p-column field="citation.inspectionDate" header="Inspection Date" [sortable]="true">     
        <ng-template let-row="rowData" pTemplate="body">
            {{row.inspectionDate | date:'MM/dd/yyyy'}}
        </ng-template>              
</p-column>


<p-column field="citation.inspectionDate" header="Inspection Date" [sortable]="true">     
        <ng-template let-row="rowData" pTemplate="body">
            {{row.inspectionDate | date:'MM/dd/yyyy' }}
        </ng-template>              
</p-column>


  // for (let value of this.myArray.values()) {
    //   console.log(value);
    // }
    // console.log(this.myArray[0]);
    // console.log(this.myArray[1]);
    // console.log(this.myArray[2]);


<div *ngIf="isValid;then content else other_content">here is ignored</div>    
<ng-template #content>content here...</ng-template>
<ng-template #other_content>other content here...</ng-template>


 <p-selectButton [options]="types" formControlName="caseType" [disabled]="true"></p-selectButton>
 
<p-calendar [(ngModel)]="dateValue" view="month" dateFormat="mm/yy" [yearNavigator]="true" yearRange="2000:2030"></p-calendar>
	
-------------------------------------------------------------------------------------------
shared
	class
	layout
	api
	
   "src/resource/css/sb-admin-styles.css"
      
    "src/resource/js/all.min.js",
	
	footer
	header
	main-content
	side-nav
	
	Dashboard
	
	
	
	public parseDate = dateString => {
    return this.tmpdate = new Date(dateString);
  }

       submissionDate: this.parseDate(res.submissionDate),
	   
	   [style]="{width: '300px'}"
	    
		style="border: 1px solid #fe0000;"
	   
	   emptyMessage="No results"
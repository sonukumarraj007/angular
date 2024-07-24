# Lifecycle sequence

After creating a component/directive by calling its constructor, Angular calls the lifecycle hook methods in the following sequence at specific moments:

Hook	Purpose and Timing

## ngOnChanges()

Respond when Angular (re)sets data-bound input properties. The method receives a SimpleChanges object of current and previous property values.

Called before ngOnInit() and whenever one or more data-bound input properties change.

## ngOnInit()

Initialize the directive/component after Angular first displays the data-bound properties and sets the directive/component's input properties.

Called once, after the first ngOnChanges().

## ngDoCheck()

Detect and act upon changes that Angular can't or won't detect on its own.

Called during every change detection run, immediately after ngOnChanges() and ngOnInit().

## ngAfterContentInit()

Respond after Angular projects external content into the component's view / the view that a directive is in.

Called once after the first ngDoCheck().

## ngAfterContentChecked()

Respond after Angular checks the content projected into the directive/component.

Called after the ngAfterContentInit() and every subsequent ngDoCheck().

## ngAfterViewInit()

Respond after Angular initializes the component's views and child views / the view that a directive is in.

Called once after the first ngAfterContentChecked().

## ngAfterViewChecked()

Respond after Angular checks the component's views and child views / the view that a directive is in.

Called after the ngAfterViewInit() and every subsequent ngAfterContentChecked().

## ngOnDestroy()

Cleanup just before Angular destroys the directive/component. Unsubscribe Observables and detach event handlers to avoid memory leaks.

Called just before Angular destroys the directive/component.




# Architecture

An app always has at least a root module that enables bootstrapping, and typically has many more feature modules.

## Decorators

Decorators are functions that modify JavaScript classes. Angular defines a number of decorators that attach specific kinds of metadata to classes, so that the system knows what those classes mean and how they should work.

Learn more about decorators on the web.
https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.x5c2ndtx0



## Introduction to modules
Angular apps are modular and Angular has its own modularity system called NgModules. NgModules are containers for a cohesive block of code dedicated to an application domain, a workflow, or a closely related set of capabilities. They can contain components, service providers, and other code files whose scope is defined by the containing NgModule. They can import functionality that is exported from other NgModules, and export selected functionality for use by other NgModules.

### NgModule metadata
An NgModule is defined by a class decorated with @NgModule(). The @NgModule() decorator is a function that takes a single metadata object, whose properties describe the module. The most important properties are as follows.

declarations: The components, directives, and pipes that belong to this NgModule.

exports: The subset of declarations that should be visible and usable in the component templates of other NgModules.

imports: Other modules whose exported classes are needed by component templates declared in this NgModule.

providers: Creators of services that this NgModule contributes to the global collection of services; they become accessible in all parts of the app. (You can also specify providers at the component level, which is often preferred.)

bootstrap: The main application view, called the root component, which hosts all other app views. Only the root NgModule should set the bootstrap property.

Here's a simple root NgModule definition.

``` typescript
@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    C1Component,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HomeComponent, multi: true
    },
    CounterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


## Support for the development cycle
Compilation: Angular provides just-in-time (JIT) compilation for the development environment, and ahead-of-time (AOT) compilation for the production environment.

Testing platform: Run unit tests on your application parts as they interact with the Angular framework.

Internationalization: Make your app available in multiple languages with Angular's internationalization (i18n) tools.

Security guidelines: Learn about Angular's built-in protections against common web-app vulnerabilities and attacks such as cross-site scripting attacks.

# Component & Templates

## Display data

Interpolation with double curly braces to display a component property.

The template is a multi-line string within ECMAScript 2015 backticks (\`). The backtick (\`)—which is not the same character as a single quote (')—allows you to compose a string over several lines, which makes the HTML more readable.

## Template Syntax

HTML is the language of the Angular template. Almost all HTML syntax is valid template syntax. The \<script> element is a notable exception; it is forbidden, eliminating the risk of script injection attacks. In practice, \<script> is ignored and a warning appears in the browser console. See the Security page for details.

Some legal HTML doesn't make much sense in a template. The \<html>, \<body>, and \<base> elements have no useful role. Pretty much everything else is fair game.

### HTML attribute vs. DOM property

This general rule can help you build a mental model of attributes and DOM properties: Attributes initialize DOM properties and then they are done. Property values can change; attribute values can't.

There is one exception to this rule. Attributes can be changed by setAttribute(), which re-initializes corresponding DOM properties.

### ngModel

Before using the ngModel directive in a two-way data binding, you must import the FormsModule and add it to the NgModule's imports list. Learn more about the FormsModule and ngModel in Forms.

You could achieve the same result with separate bindings to the \<input> element's value property and input event:

``` html
<label for="without">without NgModel:</label>
<input [value]="currentItem.name" (input)="currentItem.name=$event.target.value" id="without">
```

To streamline the syntax, the ngModel directive hides the details behind its own ngModel input and ngModelChange output properties:

``` html
<label for="example-change">(ngModelChange)="...name=$event":</label>
<input [ngModel]="currentItem.name" (ngModelChange)="currentItem.name=$event" id="example-change">
```

The ngModel data property sets the element's value property and the ngModelChange event property listens for changes to the element's value.

#### NgModel and value accessors

The details are specific to each kind of element and therefore the NgModel directive only works for an element supported by a ControlValueAccessor that adapts an element to this protocol. Angular provides value accessors for all of the basic HTML form elements and the Forms guide shows how to bind to them.

You can't apply [(ngModel)] to a non-form native element or a third-party custom component until you write a suitable value accessor. For more information, see the API documentation on DefaultValueAccessor.

You don't need a value accessor for an Angular component that you write because you can name the value and event properties to suit Angular's basic two-way binding syntax and skip NgModel altogether. The sizer in the Two-way Binding section is an example of this technique.

``` html
<app-sizer [size]="fontSizePx" (sizeChange)="fontSizePx=$event"></app-sizer>

<app-sizer [(size)]="fontSizePx"></app-sizer>
```

This [(ngModel)] syntax can only set a data-bound property. If you need to do something more, you can write the expanded form; for example, the following changes the \<input> value to uppercase:

``` html
<input [ngModel]="currentItem.name" (ngModelChange)="setUppercaseName($event)" id="example-uppercase">
```


## Lifecycle Hooks

### OnChanges

Angular calls its ngOnChanges() method whenever it detects changes to input properties of the component (or directive).
****
Angular only calls the hook when the value of the input property changes. The value of the hero property is the reference to the hero object. **Angular doesn't care that the hero's own name property changed. The hero object reference didn't change so, from Angular's perspective, there is no change to report!**

### ngAfterViewInit

``` typescript
ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    this.logIt('AfterViewInit');
    this.doSomething();
}

// This surrogate for real business logic sets the `comment`
private doSomething() {
  let c = this.viewChild.hero.length > 10 ? `That's a long name` : '';
  if (c !== this.comment) {
    // Wait a tick because the component's view has already been checked
    this.logger.tick_then(() => this.comment = c);
  }
}
```

#### Abide by the unidirectional data flow rule

The doSomething() method updates the screen when the hero name exceeds 10 characters.

Angular's unidirectional data flow rule forbids updates to the view after it has been composed. Both of these hooks fire after the component's view has been composed.

Angular throws an error if the hook updates the component's data-bound comment property immediately (try it!). The LoggerService.tick_then() postpones the log update for one turn of the browser's JavaScript cycle and that's just long enough.

``` typescript
@ViewChild(CountdownTimerComponent, {static: false})
private timerComponent: CountdownTimerComponent;

seconds() { return 0; }

ngAfterViewInit() {
    // Redefine `seconds()` to get from the **`CountdownTimerComponent**.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
    setTimeout(() => this.seconds = () => this.timerComponent.seconds, 0);
}
```

The ngAfterViewInit() lifecycle hook is an important wrinkle. The timer component isn't available until after Angular displays the parent view. So it displays 0 seconds initially.

Then Angular calls the ngAfterViewInit lifecycle hook at which time it is too late to update the parent view's display of the countdown seconds. Angular's unidirectional data flow rule prevents updating the parent view's in the same cycle. The app has to wait one turn before it can display the seconds.

Use setTimeout() to wait one tick and then revise the seconds() method so that it takes future values from the timer component.

### AfterContent hooks

``` typescript
ngAfterContentInit() {
    // contentChild is set after the content has been initialized
    this.logIt('AfterContentInit');
    this.doSomething();
}

// This surrogate for real business logic sets the `comment`
private doSomething() {
    this.comment = this.contentChild.hero.length > 10 ? `That's a long name` : '';
}
```

#### No unidirectional flow worries with AfterContent

This component's doSomething() method update's the component's data-bound comment property immediately. There's no need to wait.

Recall that Angular calls both AfterContent hooks before calling either of the AfterView hooks. Angular completes composition of the projected content before finishing the composition of this component's view. There is a small window between the AfterContent... and AfterView... hooks to modify the host view.

## Attribute Directives and Structural Directives

There are two other kinds of Angular directives, described extensively elsewhere: (1) components and (2) attribute directives.

A component manages a region of HTML in the manner of a native HTML element. Technically it's a directive with a template.

An attribute directive changes the appearance or behavior of an element, component, or another directive. For example, the built-in NgStyle directive changes several element styles at the same time.

>You can apply many attribute directives to one host element. You can only apply one structural directive to a host element.

### Structural Directives

Structural directives are responsible for HTML layout. They shape or reshape the DOM's structure, typically by adding, removing, or manipulating elements.

The asterisk is "syntactic sugar" for something a bit more complicated. Internally, Angular translates the *ngIf attribute into a \<ng-template> element, wrapped around the host element, like this.

``` html
<ng-template [ngIf]="hero">
  <div class="name">{{hero.name}}</div>
</ng-template>
```

#### Inside *ngFor

Angular transforms the *ngFor in similar fashion from asterisk (*) syntax to \<ng-template> element.

``` html
<div *ngFor="let hero of heroes; let i=index; let odd=odd; trackBy: trackById" [class.odd]="odd">
  ({{i}}) {{hero.name}}
</div>

<ng-template ngFor let-hero [ngForOf]="heroes" let-i="index" let-odd="odd" [ngForTrackBy]="trackById">
  <div [class.odd]="odd">({{i}}) {{hero.name}}</div>
</ng-template>
```

# Directives overview

There are three kinds of directives in Angular:

1. Components—directives with a template.

2. Structural directives—change the DOM layout by adding and removing DOM elements.

3. Attribute directives—change the appearance or behavior of an element, component, or another directive.

## Inside *ngFor

```html
<div *ngFor="let hero of heroes; let i=index; let odd=odd; trackBy: trackById" [class.odd]="odd">
  ({{i}}) {{hero.name}}
</div>

<ng-template ngFor let-hero [ngForOf]="heroes" let-i="index" let-odd="odd" [ngForTrackBy]="trackById">
  <div [class.odd]="odd">({{i}}) {{hero.name}}</div>
</ng-template>
```

You enable these features in the string assigned to ngFor, which you write in Angular's microsyntax.

> Everything outside the ngFor string stays with the host element (the \<div>) as it moves inside the \<ng-template>. In this example, the [ngClass]="odd" stays on the \<div>.

*ngFor with trackBy

By default, when you use *ngFor without trackBy, *ngFor tracks array of objects changing through object identity. So, if new reference of array of objects is passed to the directive, even if the array is with the same values, Angular will not be able to detect that they are already drawn and presented in the current DOM. Instead, old elements will be removed and a new collection with the same values will be redrawn.

You can make this more efficient with trackBy. Add a method to the component that returns the value NgFor should track. In this case, that value is the hero's id.

## MicroSyntax

The Angular microsyntax lets you configure a directive in a compact, friendly string. The microsyntax parser translates that string into attributes on the \<ng-template>:


# Services

``` typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
}
```

The service itself is a class that the CLI generated and that's decorated with @Injectable(). By default, this decorator has a providedIn property, which creates a provider for the service. In this case, providedIn: 'root' specifies that Angular should provide the service in the root injector.

In the basic CLI-generated app, modules are eagerly loaded which means that they are all loaded when the app launches. Angular uses an injector system to make things available between modules. In an eagerly loaded app, the root application injector makes all of the providers in all of the modules available throughout the app.

This behavior necessarily changes when you use lazy loading. Lazy loading is when you load modules only when you need them; for example, when routing. They aren’t loaded right away like with eagerly loaded modules. This means that any services listed in their provider arrays aren’t available because the root injector doesn’t know about these modules.

When the Angular router lazy-loads a module, it creates a new injector. This injector is a child of the root application injector. Imagine a tree of injectors; there is a single root injector and then a child injector for each lazy loaded module. The router adds all of the providers from the root injector to the child injector. When the router creates a component within the lazy-loaded context, Angular prefers service instances created from these providers to the service instances of the application root injector.

Any component created within a lazy loaded module’s context, such as by router navigation, gets the local instance of the service, not the instance in the root application injector. Components in external modules continue to receive the instance created for the application root.

Though you can provide services by lazy loading modules, not all services can be lazy loaded. For instance, some modules only work in the root module, such as the Router. The Router works with the global location object in the browser.

## Limiting provider scope with components

Another way to limit provider scope is by adding the service you want to limit to the component’s providers array. Component providers and NgModule providers are independent of each other. This method is helpful for when you want to eagerly load a module that needs a service all to itself. Providing a service in the component limits the service only to that component (other components in the same module can’t access it.)

``` typescript
@Component({
/* . . . */
  providers: [UserService]
})
```

Register a provider with a component when you must limit a service instance to a component and its component tree, that is, its child components.

## forRoot & forChild

Use forRoot() to separate providers from a module so you can import that module into the root module with providers and child modules without providers.

Create a static method forRoot() on the module.
Place the providers into the forRoot() method.

src/app/greeting/greeting.module.ts

``` typescript
static forRoot(config: UserServiceConfig): ModuleWithProviders {
  return {
    ngModule: GreetingModule,
    providers: [
      {provide: UserServiceConfig, useValue: config }
    ]
  };
}
```

# Forms in Angular

**Reactive forms** are more robust: they're more scalable, reusable, and testable. If forms are a key part of your application, or you're already using reactive patterns for building your application, use reactive forms.

**Template-driven forms** are useful for adding a simple form to an app, such as an email list signup form. They're easy to add to an app, but they don't scale as well as reactive forms. If you have very basic form requirements and logic that can be managed solely in the template, use template-driven forms.

## Common foundation

Both reactive and template-driven forms share underlying building blocks.

* **FormControl** tracks the value and validation status of an individual form control.

* **FormGroup** tracks the same values and status for a collection of form controls.

* **FormArray** tracks the same values and status for an array of form controls.

* **ControlValueAccessor** creates a bridge between Angular FormControl instances and native DOM elements.

![reactive form](key-diff-reactive-forms.png)

![template driven form](key-diff-td-forms.png)

## Data flow in forms

Reactive and template-driven forms follow two different strategies when handling form input.

## Template driven forms

``` html
<form #heroForm="ngForm">
```

The NgForm directive
What NgForm directive? You didn't add an NgForm directive.

Angular did. Angular automatically creates and attaches an NgForm directive to the \<form> tag.

The NgForm directive supplements the form element with additional features. It holds the controls you created for the elements with an ngModel directive and name attribute, and monitors their properties, including their validity. It also has its own valid property which is true only if every contained control is valid.

Notice that you also added a name attribute to the \<input> tag and set it to "name", which makes sense for the hero's name. Any unique value will do, but using a descriptive name is helpful. Defining a name attribute is a requirement when using [(ngModel)] in combination with a form.

Internally, Angular creates FormControl instances and registers them with an NgForm directive that Angular attached to the \<form> tag. Each FormControl is registered under the name you assigned to the name attribute. Read more in the previous section, The NgForm directive.

Each input element has a name property that is required by Angular forms to register the control with the form.

## Reactive Forms

### Dynamic controls using form arrays

FormArray is an alternative to FormGroup for managing any number of unnamed controls. As with form group instances, you can dynamically insert and remove controls from form array instances, and the form array instance value and validation status is calculated from its child controls. However, **you don't need to define a key for each control by name**, so this is a great option if you don't know the number of child values in advance. The following example shows you how to manage an array of aliases in ProfileEditor.

Listed below are the base classes and services used to create and manage form controls.

## Classes

Class Description

#### AbstractControl

The abstract base class for the concrete form control classes FormControl, FormGroup, and FormArray. It provides their common behaviors and properties.

#### FormControl

Manages the value and validity status of an individual form control. It corresponds to an HTML form control such as \<input> or \<select>.

#### FormGroup

Manages the value and validity state of a group of AbstractControl instances. The group's properties include its child controls. The top-level form in your component is FormGroup.

#### FormArray

Manages the value and validity state of a numerically indexed array of AbstractControl instances.

FormBuilder
An injectable service that provides factory methods for creating control instances.

### Directives

Directive	Description
#### FormControlDirective

Syncs a standalone FormControl instance to a form control element.

#### FormControlName

Syncs FormControl in an existing FormGroup instance to a form control element by name.

#### FormGroupDirective

Syncs an existing FormGroup instance to a DOM element.

#### FormGroupName

Syncs a nested FormGroup instance to a DOM element.

#### FormArrayName

Syncs a nested FormArray instance to a DOM element.

## Custom validators

``` typescript
/** A hero's name can't match the given regular expression */
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}
```

The function is actually a factory that takes a regular expression to detect a specific forbidden name and returns a validator function.

In this sample, the forbidden name is "bob", so the validator will reject any hero name containing "bob". Elsewhere it could reject "alice" or any name that the configuring regular expression matches.

The forbiddenNameValidator factory returns the configured validator function. That function takes an Angular control object and returns either null if the control value is valid or a validation error object. The validation error object typically has a property whose name is the validation key, 'forbiddenName', and whose value is an arbitrary dictionary of values that you could insert into an error message, {name}.

Custom async validators are similar to sync validators, but they must instead return a Promise or Observable that later emits null or a validation error object. In the case of an Observable, the Observable must complete, at which point the form uses the last value emitted for validation.

### Adding to reactive forms

``` typescript
this.heroForm = new FormGroup({
  'name': new FormControl(this.hero.name, [
    Validators.required,
    Validators.minLength(4),
    forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
  ]),
  'alterEgo': new FormControl(this.hero.alterEgo),
  'power': new FormControl(this.hero.power, Validators.required)
});
```

### Adding to template-driven forms

In template-driven forms, you don't have direct access to the FormControl instance, so you can't pass the validator in like you can for reactive forms. Instead, you need to add a directive to the template.

The corresponding ForbiddenValidatorDirective serves as a wrapper around the forbiddenNameValidator.

Angular recognizes the directive's role in the validation process because the directive registers itself with the NG_VALIDATORS provider, a provider with an extensible collection of validators.

The directive class then implements the Validator interface, so that it can easily integrate with Angular forms. Here is the rest of the directive to help you get an idea of how it all comes together:

shared/forbidden-name.directive.ts (providers)

``` typescript
@Directive({
  selector: '[appForbiddenName]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})
export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenName') forbiddenName: string;

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
                              : null;
  }
}
```

Once the ForbiddenValidatorDirective is ready, you can simply add its selector, appForbiddenName, to any input element to activate it. For example:

``` html
<input id="name" name="name" class="form-control"
      required minlength="4" appForbiddenName="bob"
      [(ngModel)]="hero.name" #name="ngModel" >
```


# Handling previous value in form control

## in reactive form
valueChanges is an Observable so you can pipe pairwise to get the previous and next values in the subscription.

```typescript
import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormArray,FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {pairwise, startWith} from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(){
    this.form = this.fb.group({ 
      example1: '',
      example2: ''
    });
    
    // No initial value. So it will only emit once 2 values entered.
    this.form.get('example1')
      .valueChanges
      .pipe(pairwise())
      .subscribe(([prev, next]: [any, any]) => {
        console.log('PREV1', prev);
        console.log('NEXT1', next);
        console.log('----');
      });

    // Fill buffer with initial value.  Will emit immediately.
    this.form.get('example2')
      .valueChanges
      .pipe(startWith(null), pairwise())
      .subscribe(([prev, next]: [any, any]) => {
        console.log('PREV2', prev);
        console.log('NEXT2', next);
        console.log('----');
      });
  }
}

```

```html
<div class="container">
  <div class="row">
    <div class="col-sm-6">
      <form [formGroup]="form">
        <div class="form-group">
          <label for="example1">Example 1 (see console)</label>
          <input
            type="text"
            class="form-control"
            id="example1"
            formControlName="example1"
          />
        </div>
        <div class="form-group">
          <label for="example2">Example 2 (see console)</label>
          <input
            type="text"
            class="form-control"
            id="example2"
            formControlName="example2"
          />
        </div>
      </form>
    </div>
  </div>
</div>

```

## in template driven form
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'kar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';

  textValue = '2';

  onChange(event) {
    console.log('PREV1', this.textValue);
    this.textValue = event;
    console.log('NEXT1', this.textValue);
    console.log('----');
  }
}
```
```html
<input type="text" class="from-control" [ngModel]="textValue" (ngModelChange)="onChange($event)">
```


## Useful commands 
https://angular.io/cli/generate

### Create app with specific prefix , routing, default style  
ng new my-app --prefix=my --routing --style=scss


### Create a lazy loaded module with routing and put lazy loaded route in app routing module
ng g m heroes/heroes --module=app --flat --routing --route=heroes

--flat=true|false	
When true, creates the new files at the top level of the current project.

Default: false

### Dry run --> Add -d or --dryRun
ng g c comp1 -d

### Skip tests
--skipTests=true|false	
When true, does not create "spec.ts" test files for the new class.

Default: false

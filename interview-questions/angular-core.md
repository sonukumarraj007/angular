# CSS

# Specificity

Specificity is a weight that is applied to a given CSS declaration, determined by the number of each selector type in the matching selector. When multiple declarations have equal specificity, the last declaration found in the CSS is applied to the element. Specificity only applies when the same element is targeted by multiple declarations. As per CSS rules, directly targeted elements will always take precedence over rules which an element inherits from its ancestor.

> Note: Proximity of elements in the document tree has no effect on the specificity.

## Selector Types

The following list of selector types increases by specificity:

Type selectors (e.g., h1) and pseudo-elements (e.g., ::before).

Class selectors (e.g., .example), attributes selectors (e.g., [type="radio"]) and pseudo-classes (e.g., :hover).

ID selectors (e.g., #example).

Universal selector (\*), combinators (+, >, ~, ' ', ||) and negation pseudo-class (:not()) have no effect on specificity. (The selectors declared inside :not() do, however.)

Inline styles added to an element (e.g., style="font-weight: bold;") always overwrite any styles in external stylesheets, and thus can be thought of as having the highest specificity.

## The !important exception

When an important rule is used on a style declaration, this declaration overrides any other declarations. Although technically !important has nothing to do with specificity, it interacts directly with it. Using !important, however, is bad practice and should be avoided because it makes debugging more difficult by breaking the natural cascading in your stylesheets. When two conflicting declarations with the !important rule are applied to the same element, the declaration with a greater specificity will be applied.

### Instead of using !important, consider:

Make better use of the CSS cascade

Use more specific rules. By indicating one or more elements before the element you're selecting, the rule becomes more specific and gets higher priority:

```html
<div id="test">
    <span>Text</span>
</div>
```

```css
div#test span {
    color: green;
}
div span {
    color: blue;
}
span {
    color: red;
}
```

No matter the order, text will be green because that rule is most specific. (Also, the rule for blue overwrites the rule for red, notwithstanding the order of the rules)

As a nonsense special case for (2), duplicate simple selectors to increase specificity when you have nothing more to specify.

```css
#myId#myId span {
    color: yellow;
}
.myClass.myClass span {
    color: orange;
}
```

<hr>

# Pipe

In Angular pipes are like functions which takes in data as input and transforms it to a desired output.

Angular comes with a stock of pipes such as DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, and PercentPipe. They are all available for use in any template.

eg. of built in date pipe use

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'app-hero-birthday',
    template: `
        <p>The hero's birthday is {{ birthday | date }}</p>
    `
})
export class HeroBirthdayComponent {
    birthday = new Date(1988, 3, 15); // April 15, 1988
}
```

## pass parameters to the pipe

A pipe can accept any number of optional parameters to fine-tune its output. To add parameters to a pipe, follow the pipe name with a colon ( : ) and then the parameter value (such as currency:'EUR'). If the pipe accepts multiple parameters, separate the values with colons (such as slice:1:5)

```html
<p>The hero's birthday is {{ birthday | date:"MM/dd/yy" }}</p>
```

You can chain pipes together in potentially useful combinations.

```html
<p>The chained hero's birthday is {{ birthday | date | uppercase}}</p>
```

## Custom pipes

You can write your own custom pipes

```typescript
// exponential-strength.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 */
@Pipe({ name: 'exponentialStrength' })
export class ExponentialStrengthPipe implements PipeTransform {
    transform(value: number, exponent?: number): number {
        return Math.pow(value, isNaN(exponent) ? 1 : exponent);
    }
}

// power-booster.component.ts
import { Component } from '@angular/core';

@Component({
    selector: 'app-power-booster',
    template: `
        <h2>Power Booster</h2>
        <p>Super power boost: {{ 2 | exponentialStrength: 10 }}</p>
    `
})
export class PowerBoosterComponent {}
```

## Pipes and change detection

Angular looks for changes to data-bound values through a change detection process that runs after every DOM event: every keystroke, mouse move, timer tick, and server response. This could be expensive. Angular strives to lower the cost whenever possible and appropriate.

Angular picks a simpler, faster change detection algorithm when you use a pipe.

## Pure and impure pipes

There are two categories of pipes: pure and impure. Pipes are pure by default.
You make a pipe impure by setting its pure flag to false.

```typescript
@Pipe({
  name: 'flyingHeroesImpure',
  pure: false
})
```

### Pure pipe

Angular executes a pure pipe only when it detects a pure change to the input value. A pure change is either a change to a primitive input value (String, Number, Boolean, Symbol) or a changed object reference (Date, Array, Function, Object).

Angular ignores changes within (composite) objects. It won't call a pure pipe if you change an input month, add to an input array, or update an input object property.

This may seem restrictive but it's also fast. An object reference check is fast—much faster than a deep check for differences—so Angular can quickly determine if it can skip both the pipe execution and a view update.

For this reason, a pure pipe is preferable when you can live with the change detection strategy. When you can't, you can use the impure pipe.

> Or you might not use a pipe at all. It may be better to pursue the pipe's purpose with a property of the component, a point that's discussed later in this page.

### Impure Pipe

Angular executes an impure pipe during every component change detection cycle. An impure pipe is called often, as often as every keystroke or mouse-move.

With that concern in mind, implement an impure pipe with great care. An expensive, long-running pipe could destroy the user experience.


<hr>

# Directives

What are Attribute Directives? How will you implement event handling in Attribute Directive?

How to pass parameters to attribute directive?

Directives for Element ref(@HostListener)

You use Attribute directives when you want to change appearance or behavior of the DOM element.

There are three kinds of directives in Angular:

1. Components — directives with a template.
2. Structural directives—change the DOM layout by adding and removing DOM elements.
3. Attribute directives—change the appearance or behavior of an element, component, or another directive.

Components are the most common of the three directives. You saw a component for the first time in the Getting Started tutorial.

Structural Directives change the structure of the view. Two examples are NgFor and NgIf. Learn about them in the Structural Directives guide.

Attribute directives are used as attributes of elements. The built-in NgStyle directive in the Template Syntax guide, for example, can change several element styles at the same time.

## Attribute Directive example

e.g. Highlight directive

```typescript
// app/highlight.directive.ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appHighlight]',
})
export class HighlightDirective {
    constructor(private el: ElementRef) {}

    @Input() defaultColor: string;

    @Input('appHighlight') highlightColor: string;

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight(this.highlightColor || this.defaultColor || 'red');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
    }

    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}
```

```html
<!-- app/app.component.html -->
<h1>My First Attribute Directive</h1>

<h4>Pick a highlight color</h4>
<div>
    <input type="radio" name="colors" (click)="color='lightgreen'" />Green <input type="radio" name="colors" (click)="color='yellow'" />Yellow
    <input type="radio" name="colors" (click)="color='cyan'" />Cyan
</div>
<p [appHighlight]="color">Highlight me!</p>

<p [appHighlight]="color" defaultColor="violet">
    Highlight me too!
</p>
```

## Structural Directive Example

```typescript
// src/app/unless.directive.ts (excerpt)

import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Add the template content to the DOM unless the condition is true.
 */
@Directive({ selector: '[appUnless]' })
export class UnlessDirective {
    private hasView = false;

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

    @Input() set appUnless(condition: boolean) {
        if (!condition && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else if (condition && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}
```

```html
<!-- src/app/app.component.html (appUnless) -->
<p *appUnless="condition" class="unless a">
    (A) This paragraph is displayed because the condition is false.
</p>

<p *appUnless="!condition" class="unless b">
    (B) Although the condition is true, this paragraph is displayed because appUnless is set to false.
</p>
```

## HostListener

The following example declares a directive that attaches a click listener to a button and counts clicks.

```typescript
@Directive({ selector: 'button[counting]' })
class CountClicks {
    numberOfClicks = 0;

    @HostListener('click', ['$event.target'])
    onClick(btn) {
        console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
    }
}

@Component({
    selector: 'app',
    template: '<button counting>Increment</button>',
})
class App {}
```

The following example registers another DOM event handler that listens for key-press events.

```typescript
import { HostListener, Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `
        <h1>Hello, you have pressed keys {{ counter }} number of times!</h1>
        Press any key to increment the counter. <button (click)="resetCounter()">Reset Counter</button>
    `,
})
class AppComponent {
    counter = 0;
    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
        this.counter++;
    }
    resetCounter() {
        this.counter = 0;
    }
}
```


## HostListener and HostBinding example
reference: https://www.digitalocean.com/community/tutorials/angular-hostbinding-hostlistener#:~:text=%40HostBinding%20and%20%40HostListener%20are%20two,the%20host%20element%20or%20component.

```typescript
import {
  Directive,
  HostBinding,
  HostListener } from '@angular/core';

@Directive({
  selector: '[appRainbow]'
})
export class RainbowDirective {
  possibleColors = [
    'darksalmon', 'hotpink', 'lightskyblue', 'goldenrod', 'peachpuff',
    'mediumspringgreen', 'cornflowerblue', 'blanchedalmond', 'lightslategrey'
  ];
  @HostBinding('style.color') color: string;
  @HostBinding('style.border-color') borderColor: string;
  @HostListener('keydown') newColor() {
    const colorPick = Math.floor(Math.random() * this.possibleColors.length);
this.color = this.borderColor = this.possibleColors[colorPick];
```

```html
<input type="text" appRainbow>
```

<hr>

## 1. @Inject() and @Injectable

### @Inject()

@Inject() is a manual mechanism for letting Angular know that a parameter must be injected.
It can be used like so:

```typescript
import { Component, Inject } from '@angular/core';
import { ChatWidget } from '../components/chat-widget';

@Component({
    selector: 'app-root',
    template: `
        Encryption: {{ encryption }}
    `
})
export class AppComponent {
    encryption = this.chatWidget.chatSocket.encryption;

    constructor(@Inject(ChatWidget) private chatWidget) {}
}
```

The above example would be simplified in TypeScript to:

```typescript
constructor(private chatWidget: ChatWidget) { }
```

#### Non-class dependencies

Not all dependencies are classes. Sometimes you want to inject a string, function, or object.

Apps often define configuration objects with lots of small facts, like the title of the application or the address of a web API endpoint. These configuration objects aren't always instances of a class. They can be object literals, as shown in the following example.

```typescript
export const HERO_DI_CONFIG: AppConfig = {
  apiEndpoint: 'api.heroes.com',
  title: 'Dependency Injection'
};

// FAIL! Can't use interface as provider token
[{ provide: AppConfig, useValue: HERO_DI_CONFIG })]

// FAIL! Can't inject using the interface as the parameter type
constructor(private config: AppConfig){ }

// solution
import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
// -----------------

providers: [{ provide: APP_CONFIG, useValue: HERO_DI_CONFIG }]
// -----------------

constructor(@Inject(APP_CONFIG) config: AppConfig) {
  this.title = config.title;
}
```

### @Injectable()

@Injectable() lets Angular know that a class can be used with the dependency injector.
@Injectable() is not strictly required if the class has other Angular decorators on it or does not have any dependencies. What is important is that any class that is going to be injected with Angular is decorated. However, best practice is to decorate injectables with @Injectable(), as it makes more sense to the reader.
Here's an example of ChatWidget marked up with @Injectable:

```typescript
import { Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { AuthWidget } from './auth-widget';
import { ChatSocket } from './chat-socket';

@Injectable()
export class ChatWidget {
    constructor(public authService: AuthService, public authWidget: AuthWidget, public chatSocket: ChatSocket) {}
}
```

In the above example Angular's injector determines what to inject into ChatWidget's constructor by using type information. This is possible because these particular dependencies are typed, and are not primitive types. In some cases Angular's DI needs more information than just types.

## 2. Services

Services in angular are classes decorated with @Injectable(). Angular create single instance of these services and provide them throughout the angular application. The main objective of service is to separate business logic from component.

```typescript
// hero.service.ts
import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';

@Injectable({
    // we declare that this service should be created
    // by the root application injector.
    providedIn: 'root'
})
export class HeroService {
    getHeroes() {
        return HEROES;
    }
}

// injecting a service into component/service
// hero-list.component.ts
import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    selector: 'app-hero-list',
    template: `
        <div *ngFor="let hero of heroes">{{ hero.id }} - {{ hero.name }}</div>
    `
})
export class HeroListComponent {
    heroes: Hero[];

    constructor(heroService: HeroService) {
        this.heroes = heroService.getHeroes();
    }
}
```

## 3. How to pass value between components without using services?

We can pass data between components by using

### 1. Using @Input() and @Output() decorators (parent child component interaction)

We can provide input properties to a component. In order to make it bindable from outside we have to decorate the property with @Input().
We can emit the values from a component. We have to decorate such properties with @Output().

```typescript
// child.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-voter',
    template: `
        <h4>{{ name }}</h4>
        <button (click)="vote(true)" [disabled]="didVote">Agree</button>
        <button (click)="vote(false)" [disabled]="didVote">Disagree</button>
    `
})
export class VoterComponent {
    @Input() name: string;
    @Output() voted = new EventEmitter<boolean>();
    didVote = false;

    vote(agreed: boolean) {
        this.voted.emit(agreed);
        this.didVote = true;
    }
}

// parent.component.ts
import { Component } from '@angular/core';

@Component({
    selector: 'app-vote-taker',
    template: `
        <h2>Should mankind colonize the Universe?</h2>
        <h3>Agree: {{ agreed }}, Disagree: {{ disagreed }}</h3>
        <app-voter *ngFor="let voter of voters" [name]="voter" (voted)="onVoted($event)"> </app-voter>
    `
})
export class VoteTakerComponent {
    agreed = 0;
    disagreed = 0;
    voters = ['Narco', 'Celeritas', 'Bombasto'];

    onVoted(agreed: boolean) {
        agreed ? this.agreed++ : this.disagreed++;
    }
}
```

## 4. ViewEncapsulations

It defines style encapsulation options for the component styles.
To control style encapsulation we can give encapsulation metadata in component decorator.
We have 4 options for encapsulation.

**ShadowDom** view encapsulation uses the browser's native shadow DOM implementation (see [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM) on the MDN site) to attach a shadow DOM to the component's host element, and then puts the component view inside that shadow DOM. The component's styles are included within the shadow DOM.

**Native** view encapsulation uses a now **deprecated** version of the browser's native shadow DOM implementation - learn about the changes.

**Emulated** view encapsulation (the **default**) emulates the behavior of shadow DOM by preprocessing (and renaming) the CSS code to effectively scope the CSS to the component's view. For details, see Inspecting generated CSS below.

**None** means that Angular does no view encapsulation. Angular adds the CSS to the global styles. The scoping rules, isolations, and protections discussed earlier don't apply. This is essentially the same as pasting the component's styles into the HTML.

Inspecting generated CSS

```html
<hero-details _nghost-pmm-5>
  <h2 _ngcontent-pmm-5>Mister Fantastic</h2>
  <hero-team _ngcontent-pmm-5 _nghost-pmm-6>
    <h3 _ngcontent-pmm-6>Team</h3>
  </hero-team>
</hero-detail>
```

There are two kinds of generated attributes:

-   An element that would be a shadow DOM host in native encapsulation has a generated \_nghost attribute. This is typically the case for component host elements.

-   An element within a component's view has a \_ngcontent attribute that identifies to which host's emulated shadow DOM this element belongs.

The exact values of these attributes aren't important. They are automatically generated and you never refer to them in application code. But they are targeted by the generated component styles, which are in the \<head> section of the DOM:

```css
[_nghost-pmm-5] {
    display: block;
    border: 1px solid black;
}

h3[_ngcontent-pmm-6] {
    background-color: white;
    border: 1px solid #777;
}
```

These styles are post-processed so that each selector is augmented with \_nghost or \_ngcontent attribute selectors. These extra selectors enable the scoping rules described in this page.

## 5. Change Detection Strategy

Angular performs change detection on all components (from top to bottom) every time something changes in your app from something like a user event or data received from a network request.

set the change detection strategy to OnPush on specific components. Doing this will instruct Angular to run change detection on these components and their sub-tree only when new references are passed to them versus when data is simply mutated.

https://alligator.io/angular/change-detection-strategy/

```typescript
enum ChangeDetectionStrategy {
  OnPush: 0
  Default: 1
}
```

OnPush: 0

Use the CheckOnce strategy, meaning that automatic change detection is deactivated until reactivated by setting the strategy to Default (CheckAlways). Change detection can still be explicitly invoked. This strategy applies to all child directives and cannot be overridden.

Default: 1

Use the default CheckAlways strategy, in which change detection is automatic until explicitly deactivated.

## 6. Bootstrap Component, Bootstrap Module

We can provide Bootstrap components in providers array of @NgModule decorator metadata.
Angular bootstraps this component when it finds it in index.html file.

Bootstrap module is the module which you specify in main.ts file.
main.ts is the entry point for the app.

```typescript
// app.module.ts
@NgModule({
    declarations: [],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

// app.component.ts
import { Component, OnInit } from '@angular/core';
import { WithoutInjectableService } from './services/without-injectable.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'angular-site';

    constructor() {}

    ngOnInit() {}
}

// main.ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
```

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Angular exercise</title>
        <base href="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
    </head>
    <body>
        <app-root></app-root>
    </body>
</html>
```

## 7. can we change the main.ts file to something else and how?

Yes. by changing the value of property main in angular.json file.

## 8. View child and content child

ViewChild is property decorator. It is configured with query selector. The change detector looks for the first element of the directive matching the selector in the view DOM.
If the DOM changes, and a new child matches the the selector, the property is updated.

View queries are set before the ngAfterViewInit callback is called.

View queries are set before the ngAfterViewInit callback is called.

Metadata Properties:

-   selector - The directive type or the name used for querying.
-   read - True to read a different token from the queried elements.
-   static - True to resolve query results before change detection runs, false to resolve after change detection. Defaults to false.

The following selectors are supported.

-   Any class with the @Component or @Directive decorator

-   A template reference variable as a string (e.g. query <my-component #cmp>\</my-component> with @ViewChild('cmp'))

-   Any provider defined in the child component tree of the current component (e.g. @ViewChild(SomeService) someService: SomeService)

-   Any provider defined through a string token (e.g. @ViewChild('someToken') someTokenVal: any)

-   A TemplateRef (e.g. query \<ng-template>\</ng-template> with @ViewChild(TemplateRef) template;)

ContentChild is same as ViewChild except it targets content DOM.

```typescript
import { ViewChildren, QueryList } from '@angular/core';
.
.
.
class JokeListComponent implements AfterViewInit {

  jokes: Joke[] = [
    new Joke("What did the cheese say when it looked in the mirror", "Hello-me (Halloumi)"),
    new Joke("What kind of cheese do you use to disguise a small horse", "Mask-a-pony (Mascarpone)")
  ];

  @ViewChild(JokeComponent) jokeViewChild: JokeComponent;
  @ViewChildren(JokeComponent) jokeViewChildren: QueryList<JokeComponent>; (1)

  ngAfterViewInit() {
    console.log(`ngAfterViewInit - jokeViewChild is ${this.jokeViewChild}`);
    let jokes: JokeComponent[] = this.jokeViewChildren.toArray(); (2)
    console.log(jokes);
  }
}
```

## 9. ngClass and NgStyle

These are the built in directives provided by Angular.
ngClass lets us control(adds or removes) classes based on condition.

```html
<some-element [ngClass]="'first second'">...</some-element>

<some-element [ngClass]="['first', 'second']">...</some-element>

<some-element [ngClass]="{'first': true, 'second': true, 'third': false}">...</some-element>

<some-element [ngClass]="stringExp|arrayExp|objExp">...</some-element>

<some-element [ngClass]="{'class1 class2 class3' : true}">...</some-element>
```

ngStyle updates styles of the html elements.

```html
<!-- Set the font of the containing element to the result of an expression. -->
<some-element [ngStyle]="{'font-style': styleExp}">...</some-element>

<!-- Set the width of the containing element to a pixel value returned by an expression. -->
<some-element [ngStyle]="{'max-width.px': widthExp}">...</some-element>

<!-- Set a collection of style values using an expression that returns key-value pairs. -->
<some-element [ngStyle]="objExp">...</some-element>
```

## 10 Entry components (deprecated in Angular 9)

An entry component is any component that Angular loads **imperatively**, (which means you’re not referencing it in the template), by type.
You specify an entry component by bootstrapping it in an NgModule, or including it in a routing definition.

> To contrast the two types of components, there are components which are included in the template, which are **declarative**. Additionally, there are components which you load imperatively; that is, entry components.

There are two main kinds of entry components:

-   The bootstrapped root component.
-   A component you specify in a route definition.

the Angular compiler only generates code for components which are reachable from the entryComponents; This means that adding more references to @NgModule.declarations does not imply that they will necessarily be included in the final bundle.

In fact, many libraries declare and export components you'll never use. For example, a material design library will export all components because it doesn’t know which ones you will use. However, it is unlikely that you will use them all. For the ones you don't reference, the tree shaker drops these components from the final code package.

**If a component isn't an entry component and isn't found in a template, the tree shaker will throw it away.** So, it's best to add only the components that are truly entry components to help keep your app as trim as possible.

## Angular moment (ngx-moment)

momentjs wrapper for angular

## If we have 500+ test cases, then how can I execute parallel threads at one time?

A Karma JS plugin to support sharding tests to run in parallel across multiple browsers. Now supporting code coverage!
https://www.npmjs.com/package/karma-parallel

## Angular event service

https://www.npmjs.com/package/angular-event-service


<hr>

# Routing

Routing is navigating from one page(component) to another.

## 1. Lazy loading

How do you combat this problem? With asynchronous routing, which loads feature modules lazily, on request. Lazy loading has multiple benefits.

You can load feature areas only when requested by the user.
You can speed up load time for users that only visit certain areas of the application.
You can continue expanding lazy loaded feature areas without increasing the size of the initial load bundle.

### Lazy loading in angular 7 and below

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'lazymodule', loadChildren: './lazymodule/lazymodule.module#LazyModuleModule' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
```

### Lazy loading in angular 8

```typescript
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
},
```

## 2. Route guards

At the moment, any user can navigate anywhere in the application anytime. That's not always the right thing to do.

Perhaps the user is not authorized to navigate to the target component.
Maybe the user must login (authenticate) first.
Maybe you should fetch some data before you display the target component.
You might want to save pending changes before leaving a component.
You might ask the user if it's OK to discard pending changes rather than save them.
You add guards to the route configuration to handle these scenarios.

A guard's return value controls the router's behavior:

If it returns true, the navigation process continues.
If it returns false, the navigation process stops and the user stays put.
If it returns a UrlTree, the current navigation cancels and a new navigation is initiated to the UrlTree returned.

Here are the 4 types of routing guards available:

1. **CanActivate**: Controls if a route can be activated.
2. **CanActivateChild**: Controls if children of a route can be activated.
3. **CanLoad**: Controls if a route can even be loaded. This becomes useful for feature modules that are lazy loaded. They won’t even load if the guard returns false.
4. **CanDeactivate**: Controls if the user can leave a route. Note that this guard doesn’t prevent the user from closing the browser tab or navigating to a different address. It only prevents actions from within the application itself.
5. **Resolve** is used to fetch dynamic data before navigating.

```typescript
// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, NavigationExtras, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;

        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        let url = `/${route.path}`;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.authService.isLoggedIn) {
            return true;
        }

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Create a dummy session id
        let sessionId = 123456789;

        // Set our navigation extras object
        // that contains our global query params and fragment
        let navigationExtras: NavigationExtras = {
            queryParams: { session_id: sessionId },
            fragment: 'anchor',
        };

        // Navigate to the login page with extras
        this.router.navigate(['/login'], navigationExtras);
        return false;
    }
}

// app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DirectiveAndPipeComponent } from './directives-and-pipes/directive-and-pipe/directive-and-pipe.component';
import { AuthGuard } from './auth.guard';
import { PathNotFoundComponent } from './path-not-found/path-not-found.component';
import { LazyLoadParentComponent } from './lazy-loading-comp/lazy-load-parent/lazy-load-parent.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'directives-and-pipes', component: DirectiveAndPipeComponent },
    { path: 'lazy-load-comp', component: LazyLoadParentComponent },
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
        canLoad: [AuthGuard],
    },
    {
        path: 'rxjs',
        loadChildren: () => import('./observables/observables.module').then((m) => m.ObservablesModule),
    },
    { path: '**', component: PathNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
```

### Can deactivate guard

```typescript
// can-deactivate-user.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UserComponent } from './user/user.component';

@Injectable({
    providedIn: 'root',
})
export class CanDeactivateUserGuard implements CanDeactivate<UserComponent> {
    canDeactivate(
        component: UserComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return component.canDeactivate();
    }
}

// admin-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { CanDeactivateUserGuard } from './users/can-deactivate-user.guard';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: 'users', component: UsersComponent },
            {
                path: 'user/:id',
                component: UserComponent,
                canDeactivate: [CanDeactivateUserGuard],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
```

## 3.Resolve Guard (Fetch data before navigating)

```typescript
// crisis-center/crisis-detail-resolver.service.ts
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { CrisisService } from './crisis.service';
import { Crisis } from './crisis';

@Injectable({
    providedIn: 'root',
})
export class CrisisDetailResolverService implements Resolve<Crisis> {
    constructor(private cs: CrisisService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis> | Observable<never> {
        let id = route.paramMap.get('id');

        return this.cs.getCrisis(id).pipe(
            take(1),
            mergeMap((crisis) => {
                if (crisis) {
                    return of(crisis);
                } else {
                    // id not found
                    this.router.navigate(['/crisis-center']);
                    return EMPTY;
                }
            })
        );
    }
}

// crisis-center-routing.module.ts (resolver)
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrisisCenterHomeComponent } from './crisis-center-home/crisis-center-home.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { CrisisCenterComponent } from './crisis-center/crisis-center.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';

import { CanDeactivateGuard } from '../can-deactivate.guard';
import { CrisisDetailResolverService } from './crisis-detail-resolver.service';

const crisisCenterRoutes: Routes = [
    {
        path: '',
        component: CrisisCenterComponent,
        children: [
            {
                path: '',
                component: CrisisListComponent,
                children: [
                    {
                        path: ':id',
                        component: CrisisDetailComponent,
                        canDeactivate: [CanDeactivateGuard],
                        resolve: {
                            crisis: CrisisDetailResolverService,
                        },
                    },
                    {
                        path: '',
                        component: CrisisCenterHomeComponent,
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(crisisCenterRoutes)],
    exports: [RouterModule],
})
export class CrisisCenterRoutingModule {}
```

## 4. Navigation using Router Link directive.

```html
<h3>ADMIN</h3>
<nav>
    <a routerLink="./" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Dashboard</a>
    <a routerLink="./crises" routerLinkActive="active">Manage Crises</a>
    <a routerLink="./heroes" routerLinkActive="active">Manage Heroes</a>
</nav>
<router-outlet></router-outlet>
```

## 5. Navigation using Router Service

```typescript
// eg 1

// Set our navigation extras object
// that contains our global query params and fragment
let navigationExtras: NavigationExtras = {
    queryParams: { session_id: sessionId },
    fragment: 'anchor',
};

// Navigate to the login page with extras
this.router.navigate(['/login'], navigationExtras);

// eg 2
// Set our navigation extras object
// that passes on our global query params and fragment
let navigationExtras: NavigationExtras = {
    queryParamsHandling: 'preserve',
    preserveFragment: true,
};

// Redirect the user
this.router.navigate([redirectUrl], navigationExtras);

// eg 3
let crisisId = this.crisis ? this.crisis.id : null;
// Pass along the crisis id if available
// so that the CrisisListComponent can select that crisis.
// Add a totally useless `foo` parameter for kicks.
// Relative navigation back to the crises
this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });

// eg 4
let heroId = hero ? hero.id : null;
// Pass along the hero id if available
// so that the HeroList component can select that hero.
// Include a junk 'foo' property for fun.
this.router.navigate(['/superheroes', { id: heroId, foo: 'foo' }]);
```

## 6. ActivatedRoute to extract params, query params, fragments, data

```typescript
constructor(
    private route: ActivatedRoute,
    private router: Router,
) {}

// eg 1
this.route.data
    .subscribe((data: { crisis: Crisis }) => {
        this.editName = data.crisis.name;
    t   his.crisis = data.crisis;
    });

// eg 2
// Capture the session ID if available
this.sessionId = this.route
    .queryParamMap
    .pipe(map(params => params.get('session_id') || 'None'));

// Capture the fragment if available
this.token = this.route
    .fragment
    .pipe(map(fragment => fragment || 'None'));

// eg 3
this.crises$ = this.route.paramMap.pipe(
    switchMap(params => {
        this.selectedId = +params.get('id');
        return this.service.getCrises();
    }
)
// ---
this.hero$ = this.route.paramMap.pipe(
    switchMap((params: ParamMap) =>
    this.service.getHero(params.get('id')))
);
```

1. How will you call your POST request in Angular2?
2. HTTP request in Angular2
3. What are the parameters to be pass to Angular POST request?

4. What is HTTP Client ? HTTP Client vs HTTP
   HttpModule is deprecated..

5. How do you handle exception in http?

# HttpClient

Modern browsers support two different APIs for making HTTP requests: the XMLHttpRequest interface and the fetch() API.

The HttpClient in @angular/common/http offers a simplified client HTTP API for Angular applications that rests on the XMLHttpRequest interface exposed by browsers. Additional benefits of HttpClient include testability features, typed request and response objects, request and response interception, Observable apis, and streamlined error handling.

eg.

```typescript
// basic get call
getConfig() {
  // now returns an Observable of Config
  return this.http.get<Config>(this.configUrl);
}
```

```typescript
// Reading the full response
getConfigResponse(): Observable<HttpResponse<Config>> {
  return this.http.get<Config>(
    this.configUrl, { observe: 'response' });
}

// reading response in comp
showConfigResponse() {
  this.configService.getConfigResponse()
    // resp is of type `HttpResponse<Config>`
    .subscribe(resp => {
      // display its headers
      const keys = resp.headers.keys();
      this.headers = keys.map(key =>
        `${key}: ${resp.headers.get(key)}`);

      // access the body directly, which is typed as `Config`.
      this.config = { ... resp.body };
    });
}
```

Requesting non-JSON data

```typescript
getTextFile(filename: string) {
  // The Observable returned by get() is of type Observable<string>
  // because a text response was specified.
  // There's no need to pass a <string> type parameter to get().
  return this.http.get(filename, {responseType: 'text'})
    .pipe(
      tap( // Log the result or error
        data => this.log(filename, data),
        error => this.logError(filename, error)
      )
    );
}
```

Error Handling in component

```typescript
showConfig() {
  this.configService.getConfig()
    .subscribe(
      (data: Config) => this.config = { ...data }, // success path
      error => this.error = error // error path
    );
}
```

Common Error handling in service

```typescript
getConfig() {
  return this.http.get<Config>(this.configUrl)
    .pipe(
      catchError(this.handleError)
    );
}

private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};
```

Retrying

```typescript
getConfig() {
  return this.http.get<Config>(this.configUrl)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
}
```

Adding and updating Headers

```typescript
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
    })
};

// at later time or in interceptors
httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

// making http post request
/** POST: add a new hero to the database */
addHero (hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    .pipe(
      catchError(this.handleError('addHero', hero))
    );
}
```

Debouncing requests

```html
<!-- package-search.component.html -->
<input (keyup)="search($event.target.value)" id="name" placeholder="Search" />

<ul>
    <li *ngFor="let package of packages$ | async">
        <b>{{package.name}} v.{{package.version}}</b> -
        <i>{{package.description}}</i>
    </li>
</ul>
```

```typescript
// package-search.component.ts
withRefresh = false;
packages$: Observable<NpmPackageInfo[]>;
private searchText$ = new Subject<string>();

search(packageName: string) {
  this.searchText$.next(packageName);
}

ngOnInit() {
  this.packages$ = this.searchText$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(packageName =>
      this.searchService.search(packageName, this.withRefresh))
  );
}

constructor(private searchService: PackageSearchService) { }
```

## Http Interceptors

### Auth Interceptor (request)

```typescript
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        const authToken = this.auth.getAuthorizationToken();

        /*
    * The verbose way:
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    */
        // Clone the request and set the new header in one step.
        const authReq = req.clone({ setHeaders: { Authorization: authToken } });

        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }
}
```

### Logging Interceptor (response)

```typescript
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { finalize, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
    constructor(private messenger: MessageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        let ok: string;

        // extend server response observable with logging
        return next.handle(req).pipe(
            tap(
                // Succeeds when there is a response; ignore other events
                (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
                // Operation failed; error is an HttpErrorResponse
                (error) => (ok = 'failed')
            ),
            // Log when response observable either completes or errors
            finalize(() => {
                const elapsed = Date.now() - started;
                const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
                this.messenger.add(msg);
            })
        );
    }
}
```

## Testing Http client

```typescript
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('HttpClient testing', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        // Inject the http service and test controller for each test
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    /// Tests begin ///

    it('can test HttpClient.get', () => {
        const testData: Data = { name: 'Test Data' };

        // Make an HTTP GET request
        httpClient.get<Data>(testUrl).subscribe((data) =>
            // When observable resolves, result should match test data
            expect(data).toEqual(testData)
        );

        // The following `expectOne()` will match the request's URL.
        // If no requests or multiple requests matched that URL
        // `expectOne()` would throw.
        const req = httpTestingController.expectOne('/data');

        // Assert that the request is a GET.
        expect(req.request.method).toEqual('GET');

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        req.flush(testData);

        // Finally, assert that there are no outstanding requests.
        httpTestingController.verify();
    });

    // Testing for errors
    it('can test for 404 error', () => {
        const emsg = 'deliberate 404 error';

        httpClient.get<Data[]>(testUrl).subscribe(
            (data) => fail('should have failed with the 404 error'),
            (error: HttpErrorResponse) => {
                expect(error.status).toEqual(404, 'status');
                expect(error.error).toEqual(emsg, 'message');
            }
        );

        const req = httpTestingController.expectOne(testUrl);

        // Respond with mock error
        req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });
});
```

<hr>


# hierarchical- injector


https://angular.io/guide/hierarchical-dependency-injection#self

https://medium.com/frontend-coach/self-or-optional-host-the-visual-guide-to-angular-di-decorators-73fbbb5c8658


@Host() decorator makes Angular to look for the injector on the component itself, so in that regard it may look similar to the @Self() decorator (7.). But that’s actually not the end: if the injector is not found there, it looks for the injector up to its host component.

Wait, what?
There are two common scenarios where said host component is something different than our current class.

We’ve been looking at a Component as our example, but we may just as well have a Directive here instead. In that case it can be used on a Component that defines its injector and that component would be the directive’s host.

Or we can have our KidComponent projected into ParentComponent(by that <ng-content></ng-content> thingy). Then we also say that our component is being hosted by ParentComponent — and if ParentComponent provides ToyService and KidComponent does not, the @Host() decorator of that inner component would still get that service’s instance (8.)



<hr>

1. What is Rxjs? How much Rxjs have you used?
2. Have you used ReactiveJS ? What is that
3. What is observable? How we can cancel observable call ?
4. Observables and Promise
5. Subject and SubjectBehavior

## RxJS

RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array#extras (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

ReactiveX combines the Observer pattern with the Iterator pattern and functional programming with collections to fill the need for an ideal way of managing sequences of events.

The essential concepts in RxJS which solve async event management are:

-   Observable: represents the idea of an invokable collection of future values or events.
-   Observer: is a collection of callbacks that knows how to listen to values delivered by the Observable.
-   Subscription: represents the execution of an Observable, is primarily useful for cancelling the execution.
-   Operators: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.
-   Subject: is the equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
-   Schedulers: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.

### Observables compared to promises

Observables are often compared to promises. Here are some key differences:

-   Observables are declarative; computation does not start until subscription. Promises execute immediately on creation. This makes observables useful for defining recipes that can be run whenever you need the result.

-   Observables provide many values. Promises provide one. This makes observables useful for getting multiple values over time.

-   Observables differentiate between chaining and subscription. Promises only have .then() clauses. This makes observables useful for creating complex transformation recipes to be used by other part of the system, without causing the work to be executed.

-   Observables subscribe() is responsible for handling errors. Promises push errors to the child promises. This makes observables useful for centralized and predictable error handling.

e.g

```typescript
import { Observable } from 'rxjs';

const observable = new Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    setTimeout(() => {
        observer.next(4);
        observer.complete();
        observer.next(5); // Is not delivered because it would violate the contract
    }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
    next(x) {
        console.log('got value ' + x);
    },
    error(err) {
        console.error('something wrong occurred: ' + err);
    },
    complete() {
        console.log('done');
    }
});
console.log('just after subscribe');

// -- output --
// just before subscribe
// got value 1
// got value 2
// got value 3
// just after subscribe
// got value 4
// done
```

It is a good idea to wrap any code in subscribe with try/catch block that will deliver an Error notification if it catches an exception:

```typescript
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(observer) {
    try {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.complete();
    } catch (err) {
        observer.error(err); // delivers an error if it caught one
    }
});
```

Unsubscribe
With subscription.unsubscribe() you can cancel the ongoing execution:

> When you subscribe, you get back a Subscription, which represents the ongoing execution. Just call unsubscribe() to cancel the execution.

```typescript
import { from } from 'rxjs';

const observable = from([10, 20, 30]);
const subscription = observable.subscribe(x => console.log(x));
// Later:
subscription.unsubscribe();
```

### Subjects

What is a Subject? An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers. While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable), Subjects are multicast.

> A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners.

**Every Subject is an Observable.** Given a Subject, you can subscribe to it, providing an Observer, which will start receiving values normally. From the perspective of the Observer, it cannot tell whether the Observable execution is coming from a plain unicast Observable or a Subject.

Internally to the Subject, **subscribe does not invoke a new execution that delivers values**. It simply registers the given Observer in a list of Observers, similarly to how addListener usually works in other libraries and languages.

**Every Subject is an Observer.** It is an object with the methods next(v), error(e), and complete(). To feed a new value to the Subject, just call next(theValue), and it will be multicasted to the Observers registered to listen to the Subject.

```typescript
import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
    next: v => console.log(`observerA: ${v}`)
});
subject.subscribe({
    next: v => console.log(`observerB: ${v}`)
});

subject.next(1);
subject.next(2);

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
```

### Variants of Subjects

#### BehaviorSubject

One of the variants of Subjects is the BehaviorSubject, which has a notion of "the current value". It stores the latest value emitted to its consumers, and whenever a new Observer subscribes, it will immediately receive the "current value" from the BehaviorSubject.

In the following example, the BehaviorSubject is initialized with the value 0 which the first Observer receives when it subscribes. The second Observer receives the value 2 even though it subscribed after the value 2 was sent.

```typescript
import { BehaviorSubject } from 'rxjs';
const subject = new BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
    next: v => console.log(`observerA: ${v}`)
});

subject.next(1);
subject.next(2);

subject.subscribe({
    next: v => console.log(`observerB: ${v}`)
});

subject.next(3);

// Logs
// observerA: 0
// observerA: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```

#### ReplaySubject

A ReplaySubject is similar to a BehaviorSubject in that it can send old values to new subscribers, but it can also record a part of the Observable execution.

> A ReplaySubject records multiple values from the Observable execution and replays them to new subscribers.

When creating a ReplaySubject, you can specify how many values to replay:

```typescript
import { ReplaySubject } from 'rxjs';
const subject = new ReplaySubject(3); // buffer 3 values for new subscribers

subject.subscribe({
    next: v => console.log(`observerA: ${v}`)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
    next: v => console.log(`observerB: ${v}`)
});

subject.next(5);

// Logs:
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerB: 2
// observerB: 3
// observerB: 4
// observerA: 5
// observerB: 5
```

#### AsyncSubject

The AsyncSubject is a variant where only the last value of the Observable execution is sent to its observers, and only when the execution completes.

```typescript
import { AsyncSubject } from 'rxjs';
const subject = new AsyncSubject();

subject.subscribe({
    next: v => console.log(`observerA: ${v}`)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
    next: v => console.log(`observerB: ${v}`)
});

subject.next(5);
subject.complete();

// Logs:
// observerA: 5
// observerB: 5
```

The AsyncSubject is similar to the last() operator, in that it waits for the complete notification in order to deliver a single value.

### Observable to promise

RxJs operator ‘toPromise’ waits for your observable to complete!

It turns out that the observable operator toPromise waits for the observable to complete (or error) before actually resolving itself!

Turning an observable into a promise i.e. turning a stream into a value — you need to wait for the last one. But it might never complete, you say. Ah, and you are indeed right. Then your promise will never get resolved — just be pending.

```typescript
const source = from([1, 2, 3]);

source.subscribe(
    x => console.log('observable', x),
    null,
    () => console.info('completed')
);
// observable 1
// observable 2
// observable 3
// completed
source.toPromise().then(x => console.log('toPromise', x));
// toPromise 3
```

## Rxjs Operators

### forkJoin

#### Use forkJoin with a dictionary of observable inputs

```typescript
import { forkJoin, of, timer } from 'rxjs';

const observable = forkJoin({
    foo: of(1, 2, 3, 4),
    bar: Promise.resolve(8),
    baz: timer(4000)
});
observable.subscribe({
    next: value => console.log(value),
    complete: () => console.log('This is how it ends!')
});

// Logs:
// { foo: 4, bar: 8, baz: 0 } after 4 seconds
// "This is how it ends!" immediately after
```

#### Use forkJoin with an array of observable inputs

```typescript
import { forkJoin, of, timer } from 'rxjs';

const observable = forkJoin([timer(4000), of(1, 2, 3, 4), Promise.resolve(8)]);
observable.subscribe({
    next: value => console.log(value),
    complete: () => console.log('This is how it ends!')
});

// Logs:
// [0, 4, 8] after 4 seconds
// "This is how it ends!" immediately after
```



<hr>

https://blog.nrwl.io/understanding-angular-ivy-incremental-dom-and-virtual-dom-243be844bf36


How Virtual DOM Works
React was the first mainstream framework to use virtual DOM, which is defined by this key idea:
Every component creates a new virtual DOM tree every time it gets rerendered. React compares the new virtual DOM tree with the old one and then applies a series of transformations to the browser DOM to match the new virtual DOM tree.

Virtual DOM has two main advantages:
We can use any programming language to implement the component’s render function, so we don’t need to compile anything. React developers mainly uses JSX, but we can use plain JavaScript as well.
We get a value as a result of rendering component. It can be used for testing, debugging, etc..

Incremental DOM
Incremental DOM is used internally at Google, and it is defined by this key idea:
Every component gets compiled into a series of instructions. These instructions create DOM trees and update them in-place when the data changes.

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

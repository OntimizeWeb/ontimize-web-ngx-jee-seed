# OntimizeWebNgx JEE Seed

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.6.

## Install

Run `npm install` to install al required dependencies.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Updating project to Angular 8

Follow this steps:

`npm install -g @angular/cli@8.3.26`


## In project

### Remove ontimize-web-ngx from package.json

`rm -rf node_modules`
`rm package-lock.json`
`npm i`

### Required Versions

- NPM: 6.10.3
- Node: 12.10.0
- Rxjs: 6.4.0

### Update all your angular packages to version 8.

`ng update @angular/cli@8.3.26 @angular/core@8.2.8 @angular/material@8.2.3 @angular/material-moment-adapter@8.2.3 @angular/animations@8.2.8 @angular/cdk@8.2.3 @angular/common@8.2.8 @angular/compiler@8.2.8 @angular/flex-layout@8.0.0-beta.27 --allow-dirty --force`

### Install ontimize-web-ngx@8.x.x

- Set OntimizeWebNgx latest version in your package.json

`"ontimize-web-ngx":"file:ontimize-web-ngx-8.0.0.tgz"` or `"ontimize-web-ngx":"8.0.0"`

- Install the packages

`npm install`

### Run your project

`ng serve`



### Changes in ViewChild / ContentChild in Angular 8

Now, we have to declare if they are static or not:

Before

`@ViewChild('test')`

Now

`@ViewChild('test', { static: true })`





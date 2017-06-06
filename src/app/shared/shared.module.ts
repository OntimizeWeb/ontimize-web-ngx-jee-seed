import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ng2';
import { BarMenuComponent } from './menu/bar-menu.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    OntimizeWebModule
  ],
  declarations: [
    BarMenuComponent
  ],
  exports: [
    CommonModule,
    BarMenuComponent
  ]
})
export class SharedModule { }

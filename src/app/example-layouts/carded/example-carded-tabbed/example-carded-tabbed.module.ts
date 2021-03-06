import { ExampleTableModule } from '@all-knowledge/example-table/example-table.module';
import { CardModule } from '@all-knowledge/shared/components/card/card.module';
import { InputModule } from '@all-knowledge/shared/components/input/input.module';
import { NotificationModule } from '@all-knowledge/shared/components/notification/notifiction.module';
import { CardedTabbedModule } from '@all-knowledge/shared/components/page-layouts/carded/carded-tabbed/carded-tabbed.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { ExampleCardedTabbedRoutingModule } from './example-carded-tabbed-routing.module';
import { ExampleCardedTabbedComponent } from './example-carded-tabbed.component';

@NgModule({
  declarations: [
    ExampleCardedTabbedComponent
  ],
  imports: [
    // Angular Core
    CommonModule,
    ReactiveFormsModule,

    // App
    ExampleCardedTabbedRoutingModule,
    CardedTabbedModule,
    TranslateModule,
    CardModule,
    InputModule,
    NotificationModule,
    ExampleTableModule,

    // Ngx Tranlate
    TranslateModule,

    // Angular Material
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ]
})
export class ExampleCardedTabbedModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';


import { APP_ROUTING  } from './app.routes';

import { FlashMessagesService } from 'angular2-flash-messages';
import { AddPasteComponent } from './components/add-paste/add-paste.component';
import { ShowPasteComponent } from './components/show-paste/show-paste.component';
import { PrivatePasteComponent } from './components/private-paste/private-paste.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AddPasteComponent,
    ShowPasteComponent,
    PrivatePasteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTING,
    ReactiveFormsModule,
    NgxPaginationModule,
    FlashMessagesModule,
    InlineEditorModule,
    AngularFontAwesomeModule
  ],
  providers: [
    FlashMessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

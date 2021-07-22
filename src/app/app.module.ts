import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app_component/app.component';
import { SiteItemComponent } from './site-item/site-item.component';
import { HistoryComponent } from './history/history.component';
import { SearchItemComponent } from './search-item/search-item.component';
import { ResultsItemComponent } from './results-item/results-item.component';
import { UtilsItemComponent } from './utils-item/utils-item.component';
import { PagesListComponent } from './pages-list/pages-list.component';

@NgModule({
  declarations: [				
    AppComponent,
    SiteItemComponent,
    HistoryComponent,
    SearchItemComponent,
    ResultsItemComponent,
    UtilsItemComponent,
      PagesListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

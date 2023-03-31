import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule } from './components/_modal';
import { AddProjectModule } from './components/add-project/add-project.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, ModalModule, AddProjectModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}

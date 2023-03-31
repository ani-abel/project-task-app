import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProjectComponent } from './add-project.component';
import { ModalModule } from '../_modal';
import { ReactiveFormsModule } from '@angular/forms';
import { AddSubProjectModule } from '../add-sub-project/add-sub-project.module';

@NgModule({
	declarations: [AddProjectComponent],
	imports: [
		CommonModule,
		ModalModule,
		AddSubProjectModule,
		ReactiveFormsModule,
	],
	exports: [AddProjectComponent],
})
export class AddProjectModule {}

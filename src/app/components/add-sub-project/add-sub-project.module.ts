import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSubProjectComponent } from './add-sub-project.component';
import { ModalModule } from '../_modal';
import { AddSubTaskModule } from '../add-sub-task/add-sub-task.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [AddSubProjectComponent],
	imports: [CommonModule, ModalModule, AddSubTaskModule, ReactiveFormsModule],
	exports: [AddSubProjectComponent],
})
export class AddSubProjectModule {}

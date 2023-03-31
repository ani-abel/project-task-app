import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSubTaskComponent } from './add-sub-task.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [AddSubTaskComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [AddSubTaskComponent],
})
export class AddSubTaskModule {}

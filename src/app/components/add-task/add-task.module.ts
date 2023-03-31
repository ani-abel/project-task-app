import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [AddTaskComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [AddTaskComponent],
})
export class AddTaskModule {}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'add-task',
	templateUrl: 'add-task.component.html',
	styleUrls: ['add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
	@Output() taskData = new EventEmitter<Object>();
	addTaskForm: FormGroup;

	ngOnInit(): void {
		this.initForm();
	}

	onSubmit(): void {
		if (this.addTaskForm.invalid) {
			return;
		}
		this.taskData.emit(this.addTaskForm.value);
	}

	private initForm(): void {
		this.addTaskForm = new FormGroup({
			task: new FormControl(null, Validators.required),
		});
	}
}

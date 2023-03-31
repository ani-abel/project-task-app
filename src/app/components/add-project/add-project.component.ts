import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import {
	Task,
	TaskStatus,
	TeamMemberType,
} from 'src/app/utils/types/util.type';
import { ModalService } from '../_modal';

@Component({
	selector: 'app-add-project',
	templateUrl: './add-project.component.html',
	styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent {
	@Output() newProjectData = new EventEmitter<Object>();
	teamMembers$: Observable<TeamMemberType[]>;
	addProjectForm: FormGroup;
	taskStatusList = Object.values(TaskStatus);
	taskStatus: TaskStatus = TaskStatus.IN_PROGRESS;
	assignedTeamMember: TeamMemberType;
	subtasks: Task[] = [];
	canChangeTaskStatus = false;
	canAssignUser = false;

	constructor(
		private modalService: ModalService,
		private storeSrv: StoreService
	) {}

	ngOnInit() {
		this.initForm();
		this.teamMembers$ = this.storeSrv.getTeamMembers();
	}

	assignTeamMemberToTask(event: any): void {
		const userId = event.target.value;
		this.assignedTeamMember = this.storeSrv.getSelectedTeamMember(userId);
	}

	initForm(): void {
		this.addProjectForm = new FormGroup({
			wireFrame: new FormControl(null, Validators.required),
			created: new FormControl(null, Validators.required),
			timeTracked: new FormControl(null, Validators.required),
			timeEstimate: new FormControl(null, Validators.required),
			dueDate: new FormControl(null, Validators.required),
			risks: new FormControl(null, Validators.required),
			priority: new FormControl(null, Validators.required),
		});
	}

	toggleUserAssignment(): void {
		this.canAssignUser = !this.canAssignUser;
	}

	toggleChangeTaskStatus(): void {
		this.canChangeTaskStatus = !this.canChangeTaskStatus;
	}

	selectTaskStatus(event: any): void {
		this.taskStatus = event.target.value;
	}

	onSubmit(): void {
		if (this.addProjectForm.invalid) {
			return;
		}
		const formData = this.addProjectForm.value;
		const remappedData: Task = {
			...this.addProjectForm.value,
			dueDate: new Date(formData.dueDate),
			created: new Date(formData.created),
			status: this.taskStatus,
			assignees: [this.assignedTeamMember],
		};
		this.newProjectData.emit({
			task: remappedData,
			subtasks: this.subtasks,
		});
		this.assignedTeamMember = null;
		this.addProjectForm.reset();
		this.closeModal('add-new-project');
	}

	onNewSubTaskData(event: any): void {
		this.subtasks.push(event);
	}

	openModal(id: string) {
		this.modalService.open(id);
	}

	closeModal(id: string): void {
		this.modalService.close(id);
	}

	// After "add subtask modal" is called, close modal
	private closeSubtaskModalAfterSubmit(): void {
		this.openModal('add-new-project');
		this.closeModal('add-new-sub-task');
	}

	openSubtaskModal(id: string): void {
		this.openModal(id);
	}
}

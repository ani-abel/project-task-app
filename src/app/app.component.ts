import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from './components/_modal/modal.service';
import { StoreService } from './services/store.service';
import { TaskType } from './utils/types/util.type';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'project-tasks-app';
	isHidden = false;
	tasks$: Observable<TaskType[]>;

	constructor(
		private modalSrv: ModalService,
		private readonly storeSrv: StoreService
	) {}

	ngOnInit() {
		this.tasks$ = this.storeSrv.getTasks();
	}

	setSelectedTask(taskId: string): void {
		this.storeSrv.setSelectedTask(taskId);
	}

	toggleDropdown() {
		this.isHidden = !this.isHidden;
	}

	openModal(id: string) {
		this.modalSrv.open(id);
	}

	closeModal(id: string) {
		this.modalSrv.close(id);
	}

	onAddNewProject(event: any): void {
		const newTask = this.storeSrv.addTask(event.task);
		if (newTask) {
			for (const subTask of event.subtasks) {
				this.storeSrv.addSubtask(subTask, newTask.task.id);
			}
		}
	}
}

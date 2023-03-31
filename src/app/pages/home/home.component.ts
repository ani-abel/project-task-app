import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ModalService } from 'src/app/components/_modal';
import { StoreService } from 'src/app/services/store.service';
import { groupBy } from 'src/app/utils/functions/util.function';
import {
	Task,
	TaskStatus,
	TaskType,
	TeamMemberType,
} from 'src/app/utils/types/util.type';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription[] = [];
	selectedTeamMembers: any[] = [];
	teamMembers$: Observable<TeamMemberType[]>;
	tasks$: Observable<TaskType[]>;
	selectedTask$: Observable<TaskType>;
	doneTasks: Task[] = [];
	backlogTasks: Task[] = [];
	inProgressTasks: Task[] = [];
	selectedTaskId: string;

	constructor(
		private modalSrv: ModalService,
		private readonly storeSrv: StoreService
	) {}

	ngOnInit() {
		this.selectedTask$ = this.storeSrv.getSelectedTask();
		this.tasks$ = this.storeSrv.getTasks();
		this.teamMembers$ = this.storeSrv.getTeamMembers();
		this.selectedTeamMembers = this.storeSrv.getSelectedTeamMembers();

		const taskSubscription = this.tasks$.subscribe((tasks) => {
			const subscription = this.selectedTask$.subscribe((data) => {
				this.selectedTaskId = data.task.id;
				const groupedData = groupBy(data.subtasks, 'status');
				this.doneTasks = groupedData[TaskStatus.DONE] ?? [];
				this.backlogTasks = groupedData[TaskStatus.BACKLOG] ?? [];
				this.inProgressTasks =
					groupedData[TaskStatus.IN_PROGRESS] ?? [];
			});
			this.subscriptions.push(subscription);
		});
		this.subscriptions.push(taskSubscription);
	}

	onNewTaskData(event: any): void {
		this.storeSrv.addSubtask(event as Task, this.selectedTaskId);
	}

	openModal(id: string) {
		this.modalSrv.open(id);
	}

	closeModal(id: string) {
		this.modalSrv.close(id);
	}

	assignNewTeamMember(event: any): void {
		const teamMembers = event.teamMembers as string[];
		this.storeSrv.setTeamMembers(teamMembers);
		this.closeModal('assign-team-member');
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) =>
			subscription.unsubscribe()
		);
	}
}

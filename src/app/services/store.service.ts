import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidV4 } from 'uuid';
import { generateRandomName } from '../utils/functions/util.function';
import {
	Task,
	TaskStage,
	TaskStatus,
	TaskType,
	TeamMemberType,
} from '../utils/types/util.type';

@Injectable({ providedIn: 'root' })
export class StoreService {
	private projects = [];
	private teamMembers$: BehaviorSubject<TeamMemberType[]>;
	private selectedTeamMembers: number[] = [];
	private tasks$: BehaviorSubject<TaskType[]>;
	private selectedTask$: BehaviorSubject<TaskType>;

	private initTeamMember(): void {
		const team: TeamMemberType[] = [
			{
				id: uuidV4(),
				initials: 'DG',
				name: 'David Gaines',
			},
			{
				id: uuidV4(),
				initials: 'JM',
				name: 'Jenny Mickey',
			},
		];
		const currentValue = this.teamMembers$.getValue();
		currentValue.push(...team);
		this.teamMembers$.next(currentValue);
	}

	private initTasks(): void {
		const newTask = new TaskType();
		newTask.task = {
			assignees: [
				{
					id: uuidV4(),
					initials: 'DG',
					name: 'David Gaines',
				},
			],
			created: new Date('12/12/2023'),
			dueDate: new Date('12/12/2023'),
			id: uuidV4(),
			priority: 'High',
			risks: 'High',
			status: TaskStatus.IN_PROGRESS,
			timeEstimate: '3d',
			timeTracked: '3hours',
			title: 'Project-03994',
			type: TaskStage.TASK,
			wireFrame: 'Sample Project',
		};
		newTask.subtasks = [
			{
				assignees: [
					{
						id: uuidV4(),
						initials: 'JM',
						name: 'Jenny Mickey',
					},
				],
				wireFrame: 'Sample sub task',
				created: new Date('12/12/2023'),
				dueDate: new Date('12/12/2023'),
				id: uuidV4(),
				priority: 'High',
				risks: 'High',
				status: TaskStatus.IN_PROGRESS,
				timeEstimate: '3d',
				timeTracked: '3hours',
				title: 'sub-project-03943',
				type: TaskStage.SUB_TASK,
			},
			{
				assignees: [
					{
						id: uuidV4(),
						initials: 'JM',
						name: 'Jenny Mickey',
					},
				],
				wireFrame: 'Sample sub task',
				created: new Date('12/12/2023'),
				dueDate: new Date('12/12/2023'),
				id: uuidV4(),
				priority: 'High',
				risks: 'High',
				status: TaskStatus.IN_PROGRESS,
				timeEstimate: '3d',
				timeTracked: '3hours',
				title: 'sub-project-03903',
				type: TaskStage.SUB_TASK,
			},
			{
				assignees: [
					{
						id: uuidV4(),
						initials: 'JM',
						name: 'Jenny Mickey',
					},
				],
				wireFrame: 'Sample sub task',
				created: new Date('12/12/2023'),
				dueDate: new Date('12/12/2023'),
				id: uuidV4(),
				priority: 'High',
				risks: 'High',
				status: TaskStatus.DONE,
				timeEstimate: '3d',
				timeTracked: '3hours',
				title: 'sub-project-03999',
				type: TaskStage.SUB_TASK,
			},
			{
				assignees: [
					{
						id: uuidV4(),
						initials: 'DG',
						name: 'David Gaines',
					},
				],
				wireFrame: 'Sample sub task',
				created: new Date('12/12/2023'),
				dueDate: new Date('12/12/2023'),
				id: uuidV4(),
				priority: 'High',
				risks: 'High',
				status: TaskStatus.BACKLOG,
				timeEstimate: '3d',
				timeTracked: '3hours',
				title: 'sub-project-44903',
				type: TaskStage.SUB_TASK,
			},
		];
		const currentValue = this.tasks$.getValue();
		currentValue.push(newTask);
		this.selectedTask$.next(newTask);
	}

	constructor() {
		this.teamMembers$ = new BehaviorSubject<TeamMemberType[]>([]);
		this.tasks$ = new BehaviorSubject([]);
		this.selectedTask$ = new BehaviorSubject(null);
		this.initTeamMember();
		this.initTasks();
	}

	getSelectedTeamMember(userId: string) {
		const currentData = this.teamMembers$.getValue();
		return currentData.find((item) => item.id === userId);
	}

	updateTaskStatus(taskId: string, status: TaskStatus): void {
		const currentData = this.tasks$.getValue();
		const taskIndex = currentData.findIndex(
			({ task }) => task.id === taskId
		);
		if (taskIndex !== -1) {
			currentData[taskIndex].task.status = status;
		}
		this.tasks$.next(currentData);
	}

	updateSubTaskStatus(
		taskId: string,
		subTaskId: string,
		status: TaskStatus
	): void {
		const currentData = this.tasks$.getValue();
		const taskIndex = currentData.findIndex(
			({ task }) => task.id === taskId
		);
		if (taskIndex !== -1) {
			const subTaskIndex = currentData[taskIndex].subtasks.findIndex(
				({ id }) => id === subTaskId
			);
			currentData[taskIndex].subtasks[subTaskIndex].status = status;

			// If all subtasks are completed, mark parent task as either complete or in backlog
			const subTasksCompleted = currentData[taskIndex].subtasks.every(
				(item) => item.status === status
			);
			if (subTasksCompleted) {
				currentData[taskIndex].task.status = status;
			}
		}
		this.tasks$.next(currentData);
	}

	setSelectedTask(taskId: string): void {
		const currentData = this.tasks$.getValue();
		const task = currentData.find((item) => item.task.id === taskId);
		this.selectedTask$.next(task);
	}

	getSelectedTask() {
		return this.selectedTask$.asObservable();
	}

	addTask(task: Task): TaskType {
		const currentData = this.tasks$.getValue();
		const newTask = new TaskType();
		newTask.task = task;
		newTask.task.title = task.title ?? generateRandomName();
		newTask.task.type = TaskStage.TASK;
		newTask.task.id = uuidV4();
		newTask.subtasks = [];
		if (currentData.length <= 0) {
			this.selectedTask$.next(newTask);
		}
		currentData.push(newTask);
		this.tasks$.next(currentData);
		return newTask;
	}

	addSubtask(subTask: Task, taskId: string): void {
		const currentData = this.tasks$.getValue();
		const taskIndex = currentData.findIndex(
			(item) => item.task.id === taskId
		);
		if (taskIndex !== -1) {
			currentData[taskIndex].subtasks.push({
				...subTask,
				type: TaskStage.SUB_TASK,
				status: subTask.status ?? TaskStatus.IN_PROGRESS,
				id: uuidV4(),
			});
		}
		this.tasks$.next(currentData);
	}

	assignUserToTask(taskId: string, userId: string): void {
		const currentData = this.tasks$.getValue();
		const taskIndex = currentData.findIndex(
			(item) => item.task.id === taskId
		);
		if (taskIndex !== -1) {
			const user = this.teamMembers$
				.getValue()
				?.find((item) => item.id === userId);
			if (user) {
				currentData[taskIndex].task.assignees.push(user);
			}
		}
		this.tasks$.next(currentData);
	}

	assignUserToSubTask(
		taskId: string,
		subTaskId: string,
		userId: string
	): void {
		const currentData = this.tasks$.getValue();
		const taskIndex = currentData.findIndex(
			(item) => item.task.id === taskId
		);
		if (taskIndex !== -1) {
			const task = currentData[taskIndex];
			const subTaskIndex = task.subtasks.findIndex(
				(item) => item.id === subTaskId
			);
			if (subTaskIndex !== -1) {
				const user = this.teamMembers$
					.getValue()
					?.find((item) => item.id === userId);
				if (user) {
					currentData[taskIndex].subtasks[
						subTaskIndex
					].assignees.push(user);
				}
			}
		}
		this.tasks$.next(currentData);
	}

	getSingleTask(taskId: string): TaskType {
		const currentData = this.tasks$.getValue();
		return currentData.find(({ task }) => task.id == taskId);
	}

	getTasks() {
		return this.tasks$.asObservable();
	}

	setSelectedTeamMembers(payload: number[]): void {
		this.selectedTeamMembers.push(...payload);
	}

	getSelectedTeamMembers() {
		return [];
		// return this.teamMembers.filter((user) =>
		// 	this.selectedTeamMembers
		// 		.map((id) => String(id))
		// 		.includes(`${user.id}`)
		// );
	}

	setProjects(): void {
		this.projects.push;
	}

	setTeamMembers(names: string[]): void {
		const currentData = this.teamMembers$.getValue();
		for (const name of names) {
			let initials = name.charAt(0);
			const names = name.split(' ');
			if (names.length > 1) {
				initials += name[1].charAt(0);
			}
			currentData.push({
				id: uuidV4(),
				name,
				initials: initials.toUpperCase(),
			});
		}
		this.teamMembers$.next(currentData);
	}

	getTeamMembers() {
		return this.teamMembers$.asObservable();
	}
}

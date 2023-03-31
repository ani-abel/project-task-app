export class TeamMemberType {
	id: string;
	name: string;
	initials: string;
}

export enum TaskStatus {
	IN_PROGRESS = 'IN_PROGRESS',
	BACKLOG = 'BACKLOG',
	DONE = 'DONE',
}

export enum TaskStage {
	TASK = 'TASK',
	SUB_TASK = 'SUB_TASK',
}

export class Task {
	id: string;
	title: string;
	created: Date;
	timeTracked: string;
	timeEstimate: string;
	dueDate: Date;
	risks: string;
	priority: string;
	wireFrame: string;
	status: TaskStatus;
	type: TaskStage;
	assignees: TeamMemberType[];
}

export class TaskType {
	task: Task;
	subtasks: Task[];
}

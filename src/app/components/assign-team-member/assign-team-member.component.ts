import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { TeamMemberType } from 'src/app/utils/types/util.type';

@Component({
	selector: 'app-assign-team-member',
	templateUrl: 'assign-team-member.component.html',
	styleUrls: ['assign-team-member.component.scss'],
})
export class AssignTeamMemberComponent implements OnInit {
	@Output() taskData = new EventEmitter<Object>();
	addTeamMemberForm: FormGroup;
	teamMembers$: Observable<TeamMemberType[]>;
	assignedTeamMembers: number[] = [];

	constructor(private readonly storeSrv: StoreService) {}

	ngOnInit(): void {
		this.initForm();
		this.teamMembers$ = this.storeSrv.getTeamMembers();
	}

	onSubmit(): void {
		if (this.addTeamMemberForm.invalid) {
			return;
		}
		this.taskData.emit(this.addTeamMemberForm.value);
		this.addTeamMemberForm.reset();
		this.initForm();
	}

	onRemoveField(selector: string, index: number): void {
		(this.addTeamMemberForm.get(selector) as FormArray).removeAt(index);
	}

	onAddField(selector: string): FormControl {
		const newControl = new FormControl(null, Validators.required);
		(this.addTeamMemberForm.get(selector) as FormArray).push(newControl);
		return newControl;
	}

	private initForm(): void {
		this.addTeamMemberForm = new FormGroup({
			teamMembers: new FormArray([
				new FormControl(null, Validators.required),
			]),
		});
	}
}

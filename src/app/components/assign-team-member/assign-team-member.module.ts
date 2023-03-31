import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignTeamMemberComponent } from './assign-team-member.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [AssignTeamMemberComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [AssignTeamMemberComponent],
})
export class AssignTeamMemberModule {}

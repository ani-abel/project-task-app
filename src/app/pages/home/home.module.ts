import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ModalModule } from '../../components/_modal';
import { AssignTeamMemberModule } from '../../components/assign-team-member/assign-team-member.module';
import { AddSubProjectModule } from '../../components/add-sub-project/add-sub-project.module';
import { AddSubTaskModule } from 'src/app/components/add-sub-task/add-sub-task.module';

@NgModule({
	declarations: [HomeComponent],
	imports: [
		CommonModule,
		HomeRoutingModule,
		ModalModule,
		AddSubProjectModule,
		AddSubTaskModule,
		AssignTeamMemberModule,
	],
})
export class HomeModule {}

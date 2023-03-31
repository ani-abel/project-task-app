import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubProjectComponent } from './add-sub-project.component';

describe('AddProjectComponent', () => {
	let component: AddSubProjectComponent;
	let fixture: ComponentFixture<AddSubProjectComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AddSubProjectComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AddSubProjectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

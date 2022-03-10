import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserAlertDialogComponent } from './delete-user-dialog.component';

describe('DeleteUserAlertDialogComponent', () => {
  let component: DeleteUserAlertDialogComponent;
  let fixture: ComponentFixture<DeleteUserAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserAlertDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

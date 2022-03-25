import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateServiceDialogComponent } from './update-service-dialog.component';

describe('UpdateServiceComponent', () => {
  let component: UpdateServiceDialogComponent;
  let fixture: ComponentFixture<UpdateServiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateServiceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

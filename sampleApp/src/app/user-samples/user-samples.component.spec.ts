import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSamplesComponent } from './user-samples.component';

describe('UserSamplesComponent', () => {
  let component: UserSamplesComponent;
  let fixture: ComponentFixture<UserSamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

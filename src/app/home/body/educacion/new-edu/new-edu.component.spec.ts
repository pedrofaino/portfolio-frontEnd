import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEduComponent } from './new-edu.component';

describe('NewEduComponent', () => {
  let component: NewEduComponent;
  let fixture: ComponentFixture<NewEduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEduComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

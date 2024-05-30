import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyposComponent } from './mypos.component';

describe('MyposComponent', () => {
  let component: MyposComponent;
  let fixture: ComponentFixture<MyposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

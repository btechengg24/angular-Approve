import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MgrapprovalComponent } from './mgrapproval.component';

describe('MgrapprovalComponent', () => {
  let component: MgrapprovalComponent;
  let fixture: ComponentFixture<MgrapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MgrapprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MgrapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

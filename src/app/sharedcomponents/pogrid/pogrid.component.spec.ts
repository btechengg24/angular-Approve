import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PogridComponent } from './pogrid.component';

describe('PogridComponent', () => {
  let component: PogridComponent;
  let fixture: ComponentFixture<PogridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PogridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PogridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

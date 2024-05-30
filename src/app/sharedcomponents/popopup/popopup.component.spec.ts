import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopopupComponent } from './popopup.component';

describe('PopopupComponent', () => {
  let component: PopopupComponent;
  let fixture: ComponentFixture<PopopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

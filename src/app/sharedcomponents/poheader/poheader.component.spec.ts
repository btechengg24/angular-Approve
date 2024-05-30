import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoheaderComponent } from './poheader.component';

describe('PoheaderComponent', () => {
  let component: PoheaderComponent;
  let fixture: ComponentFixture<PoheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoheaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

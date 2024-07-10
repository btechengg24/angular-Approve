import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CroppopupComponent } from './croppopup.component';

describe('CroppopupComponent', () => {
  let component: CroppopupComponent;
  let fixture: ComponentFixture<CroppopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CroppopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CroppopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

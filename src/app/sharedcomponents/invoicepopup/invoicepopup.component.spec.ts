import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicepopupComponent } from './invoicepopup.component';

describe('InvoicepopupComponent', () => {
  let component: InvoicepopupComponent;
  let fixture: ComponentFixture<InvoicepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicepopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoicepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

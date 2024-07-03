import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicetotextComponent } from './invoicetotext.component';

describe('InvoicetotextComponent', () => {
  let component: InvoicetotextComponent;
  let fixture: ComponentFixture<InvoicetotextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicetotextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoicetotextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

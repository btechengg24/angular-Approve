import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicegridComponent } from './invoicegrid.component';

describe('InvoicegridComponent', () => {
  let component: InvoicegridComponent;
  let fixture: ComponentFixture<InvoicegridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicegridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoicegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

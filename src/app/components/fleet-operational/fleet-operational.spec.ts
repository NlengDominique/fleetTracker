import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetOperational } from './fleet-operational';

describe('FleetOperational', () => {
  let component: FleetOperational;
  let fixture: ComponentFixture<FleetOperational>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetOperational]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetOperational);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

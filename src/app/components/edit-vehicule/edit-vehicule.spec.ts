import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicule } from './edit-vehicule';

describe('EditVehicule', () => {
  let component: EditVehicule;
  let fixture: ComponentFixture<EditVehicule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVehicule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVehicule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroAgregarComponent } from './libro-agregar.component';

describe('LibroAgregarComponent', () => {
  let component: LibroAgregarComponent;
  let fixture: ComponentFixture<LibroAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibroAgregarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibroAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyModalComponent } from './technology-modal.component';

describe('TechnologyModalComponent', () => {
  let component: TechnologyModalComponent;
  let fixture: ComponentFixture<TechnologyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfacturesComponent } from './editfactures.component';

describe('EditfacturesComponent', () => {
  let component: EditfacturesComponent;
  let fixture: ComponentFixture<EditfacturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditfacturesComponent]
    });
    fixture = TestBed.createComponent(EditfacturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

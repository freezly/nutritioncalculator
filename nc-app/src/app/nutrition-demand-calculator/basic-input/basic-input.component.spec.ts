import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BasicInputComponent } from './basic-input.component';

describe('BasicInputComponent', () => {
  let component: BasicInputComponent;
  let fixture: ComponentFixture<BasicInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicInputComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BasicInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

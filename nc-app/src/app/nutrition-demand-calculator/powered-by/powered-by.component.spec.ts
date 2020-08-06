import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PoweredByComponent } from './powered-by.component';

describe('PoweredByComponent', () => {
  let component: PoweredByComponent;
  let fixture: ComponentFixture<PoweredByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoweredByComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PoweredByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

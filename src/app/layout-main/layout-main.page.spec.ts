import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LayoutMainPage } from './layout-main.page';

describe('LayoutMainPage', () => {
  let component: LayoutMainPage;
  let fixture: ComponentFixture<LayoutMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutMainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

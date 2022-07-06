import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>, component: AppComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should create a form group with two controls`, () => {
    const form = component.form
    expect(form).toBeDefined()

    // check that we created 2 controls
    expect(form.controls).toHaveSize(2)

    // check that the second control has the required validator
    const mid = form.controls['model-id'];
    expect(mid.validator).toBeDefined()
    expect(mid.valid).toBeFalsy();
    mid.setValue('foo')
    expect(mid.valid).toBeTruthy();
  })

  it(`should render a form with two fields`, () => {
    const formFields = fixture.debugElement.queryAll(By.css('input.form-control'));
    expect(formFields).toHaveSize(2);
  });
});

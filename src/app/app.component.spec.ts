import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should be 3', () => {
    // A = Arrange
    const num1 = 1;
    const num2 = 2;

    // A = Act
    const result = num1 + num2;

    // A = Assert
    expect(result).toBe(3);
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router outlet', () => {
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
    // expect(compiled.querySelector('router-outlet')).not.toBeNull(); //** asi esta en el curso **
  });

  it('shoul render rounter-outlet wrapped with css class', () => {
    const divELement = compiled.querySelector('div');

    const mustHaveClasses =
      'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(
        ' '
      );

    const divClasses = divELement?.classList.value.split(' ');

    expect(divELement).not.toBeNull();

    // divELement?.classList.forEach((className) => {
    //   expect(mustHaveClasses).toContain(className);
    // });

    mustHaveClasses.forEach((className) => {
      expect(divClasses).toContain(className);
    });
  });

  it("should contain 'Buy me a beer' link", () => {
    const aElement = compiled.querySelector('a');

    const aTitle = aElement?.getAttribute('title');

    const aHref = aElement?.getAttribute('href');

    expect(aElement).not.toBeNull();

    expect(aTitle).toContain('Buy me a beer');

    expect(aHref).toContain('https://www.buymeacoffee.com/scottwindon');
  });
});

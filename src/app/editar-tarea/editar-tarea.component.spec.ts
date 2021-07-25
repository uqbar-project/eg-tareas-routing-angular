import { APP_BASE_HREF } from '@angular/common'
import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Data, Router, RouterModule } from '@angular/router'

import { routes, routingComponents } from '../app-routing.module'
import { StubTareaService, TareaService } from '../tarea.service'
import { EditarTareaComponent } from './editar-tarea.component'


type subscribeFunction = { (fn: (value: Data) => void): void}

const existingTaskId = 2

function subscribeValido(fn: (value: Data) => void) {
  fn({ id: existingTaskId })
}

function subscribeInvalido(fn: (value: Data) => void) {
  fn({ id: 5 })
}

let component: EditarTareaComponent
let fixture: ComponentFixture<EditarTareaComponent>
let routerSpy: jasmine.SpyObj<Router>
let stubTareaService: TareaService

describe('EditarTareaComponent of a valid task', () => {
  routerSpy = jasmine.createSpyObj('Router', ['navigate'])

  beforeEach(waitForAsync(() => {
    stubTareaService = new StubTareaService()
    TestBed.configureTestingModule({
      declarations: defaultDeclarations(),
      imports: defaultImports(),
      providers: stubProviders(stubTareaService, subscribeValido),
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTareaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should show the description for a certain task', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement
    fixture.whenStable().then(() => {
      expect(compiled.querySelector('[data-testid="descripcionTarea"]').value).toContain('Aprender Routing de Angular')
    })
  }))
  it('should take effect when form submitted', waitForAsync(() => {
    const newValue = 'valorNuevo'
    const compiled = fixture.debugElement.nativeElement
    component.descripcionTarea = newValue
    compiled.querySelector('[data-testid="aceptar"]').click()
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      expect(stubTareaService.getTareaById(existingTaskId)?.descripcion).toBe(newValue)
    })
  }))

  it('should navigate back to home when submitted', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement
    compiled.querySelector('[data-testid="aceptar"]').click()
    fixture.whenStable().then(() => {
      const [route] = routerSpy.navigate.calls.first().args[0]
      expect(route).toBe('/listaTareas')
    })
  }))
  it('should navigate back to home when cancelled', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement
    compiled.querySelector('[data-testid="cancelar"]').click()
    fixture.whenStable().then(() => {
      const [route] = routerSpy.navigate.calls.first().args[0]
      expect(route).toBe('/listaTareas')
    })
  }))

})

describe('EditarTareaComponent of a non-existent task', () => {
  beforeEach(waitForAsync(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    stubTareaService = new StubTareaService()

    TestBed.configureTestingModule({
      declarations: defaultDeclarations(),
      imports: defaultImports(),
      providers: stubProviders(stubTareaService, subscribeInvalido)
    })
      .compileComponents()
  }))

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(EditarTareaComponent)
    fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should go back to home', fakeAsync(() => {
    const [route] = routerSpy.navigate.calls.first().args[0]
    expect(route).toBe('/listaTareas')
  }))
})

function defaultDeclarations() {
  return [
    routingComponents,
    EditarTareaComponent
  ]
}

function defaultImports() {
  return [
    FormsModule,
    RouterModule.forRoot(routes)
  ]
}

/* Generamos los providers para nuestros tests */
function stubProviders(stubTareaService: TareaService, subscribe: subscribeFunction) {
  return [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: ActivatedRoute,
      useValue: {
        params: {
          subscribe,
        }
      }
    },
    { provide: TareaService, useValue: stubTareaService },
    { provide: Router, useValue: routerSpy }
  ]
}

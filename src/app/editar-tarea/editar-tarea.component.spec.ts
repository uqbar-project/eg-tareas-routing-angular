import { APP_BASE_HREF } from '@angular/common'
import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks, tick } from '@angular/core/testing'
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

routerSpy = jasmine.createSpyObj('Router', ['navigate'])

describe('EditarTareaComponent of a valid task', () => {

  beforeEach((async () => {
    stubTareaService = new StubTareaService()
    TestBed.configureTestingModule({
      declarations: defaultDeclarations(),
      imports: defaultImports(),
      providers: stubProviders(stubTareaService, subscribeValido),
    })
      .compileComponents()
  }))

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(EditarTareaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    flushMicrotasks()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should show the description for a certain task', fakeAsync(() => {
    fixture.detectChanges()
    flushMicrotasks()
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('[data-testid="descripcionTarea"]').value).toContain('Aprender Routing de Angular')
  }))
  it('should take effect when form submitted', fakeAsync(() => {
    const newValue = 'valorNuevo'
    const compiled = fixture.debugElement.nativeElement
    component.descripcionTarea = newValue
    compiled.querySelector('[data-testid="aceptar"]').click()
    fixture.detectChanges()
    flushMicrotasks()
    expect(stubTareaService.getTareaById(existingTaskId)?.descripcion).toBe(newValue)
  }))

  it('should navigate back to home when submitted', fakeAsync(() => {
    clickOn('aceptar')
    shouldNavigateTo('/listaTareas')    
  }))
  it('should navigate back to home when cancelled', fakeAsync(() => {
    clickOn('cancelar')
    shouldNavigateTo('/listaTareas')    
  }))

  function clickOn(buttonDataTestId: string) {
    const compiled = fixture.debugElement.nativeElement
    compiled.querySelector(`[data-testid='${buttonDataTestId}']`).click()
    fixture.detectChanges()
    tick()
  }

  function shouldNavigateTo(url: string) {
    const [route] = routerSpy.navigate.calls.first().args[0]
    expect(route).toBe(url)
  }

})

describe('EditarTareaComponent of a non-existent task', () => {
  beforeEach((async () => {
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

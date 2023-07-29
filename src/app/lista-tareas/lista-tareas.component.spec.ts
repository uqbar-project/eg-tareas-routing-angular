import { APP_BASE_HREF } from '@angular/common'
import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { routes, routingComponents } from '../app-routing.module'
import { ListaTareasComponent } from './lista-tareas.component'

describe('ListaTareasComponent', () => {
  let component: ListaTareasComponent
  let fixture: ComponentFixture<ListaTareasComponent>

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListaTareasComponent,
        routingComponents
      ],
      imports: [
        FormsModule,
        RouterModule.forRoot(routes)
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents()
    fixture = TestBed.createComponent(ListaTareasComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    flushMicrotasks()
  }))

  it('should show successfully', () => {
    expect(component).toBeTruthy()
  })
  it('should contain no tasks initially', () => {
    expect(component.tareas.length).toEqual(0)
  })
  it('should show a new task in tasks table', fakeAsync(() => {
    const testingAngularDescription = 'Testing Angular'
    const compiled = fixture.debugElement.nativeElement
    component.descripcionTarea = testingAngularDescription
    // component.agregarTarea
    compiled.querySelector(`[data-testid="agregarTarea"]`).click()
    // Forzamos el binding
    fixture.detectChanges()
    // Disparamos los eventos asincrónicos
    flushMicrotasks()
    expect(compiled.querySelector('[data-testid="desc1"]').textContent).toContain(testingAngularDescription)
  }))
})

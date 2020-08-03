import { APP_BASE_HREF } from '@angular/common'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { routes, routingComponents } from '../app-routing.module'
import { ListaTareasComponent } from './lista-tareas.component'

describe('ListaTareasComponent', () => {
  let component: ListaTareasComponent
  let fixture: ComponentFixture<ListaTareasComponent>

  beforeEach(async(() => {
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
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTareasComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should show successfully', () => {
    expect(component).toBeTruthy()
  })
  it('should contain no tasks initially', () => {
    expect(component.tareas.length).toEqual(0)
  })
  it('should show a new task in tasks table', () => {
    const testingAngularDescription = 'Testing Angular'
    component.descripcionTarea = testingAngularDescription
    component.agregarTarea()
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('#desc1').textContent).toContain(testingAngularDescription)
  })
})

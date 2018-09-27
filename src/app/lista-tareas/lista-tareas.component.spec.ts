import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { APP_BASE_HREF } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { AppRoutingModule, routingComponents, routes } from '../app-routing.module'
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

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should contain no tasks initially', () => {
    expect(component.tareas.length).toEqual(0)
  })
  it('when adding a new task it should appear in tasks table', () => {
    const testingAngularDescription = 'Testing Angular'
    component.descripcionTarea = testingAngularDescription
    component.agregarTarea()
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('#desc0').textContent).toContain(testingAngularDescription)
  })
})

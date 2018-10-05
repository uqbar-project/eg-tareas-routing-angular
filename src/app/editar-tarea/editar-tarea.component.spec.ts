import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { APP_BASE_HREF } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ActivatedRoute, Data } from '@angular/router'
import { AppRoutingModule, routingComponents, routes } from '../app-routing.module'
import { EditarTareaComponent } from './editar-tarea.component'
import { TareaService, StubTareaService } from '../tarea.service'

describe('EditarTareaComponent', () => {
  let component: EditarTareaComponent
  let fixture: ComponentFixture<EditarTareaComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        routingComponents,
        EditarTareaComponent
      ],
      imports: [
        FormsModule,
        RouterModule.forRoot(routes)
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: ActivatedRoute,
          useValue: {
            params: {
              // TODO: Mejorar esto
              subscribe: (fn: (value: Data) => void) => fn({
                id: 1
              })
            }
          }
        },
        { provide: TareaService, useValue: new StubTareaService() }
      ]
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
  it('should show task description for id 1', () => {
    const compiled = fixture.debugElement.nativeElement
    fixture.whenStable().then(() => {
      expect(compiled.querySelector('#descripcionTarea').value).toContain('Aprender Routing de Angular')
    }) 
  })
})

import { APP_BASE_HREF } from '@angular/common'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Data, RouterModule } from '@angular/router'

import { routes, routingComponents } from '../app-routing.module'
import { StubTareaService, TareaService } from '../tarea.service'
import { EditarTareaComponent } from './editar-tarea.component'

function subscribe(fn: (value: Data) => void) {
  fn({ id: 2 })
}

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
              subscribe,
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
  it('should show the description for a certain task', (done) => {
    const compiled = fixture.debugElement.nativeElement
    fixture.whenStable().then(() => {
      expect(compiled.querySelector('[data-testid="descripcionTarea"]').value).toContain('Aprender Routing de Angular')
      done()
    })
  })
})

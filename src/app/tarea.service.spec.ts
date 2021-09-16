/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing'
import { TareaService } from './tarea.service'

describe('Service: Tarea', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TareaService]
    })
  })

  it('should create', inject([TareaService], (service: TareaService) => {
    expect(service).toBeTruthy()
  }))
})

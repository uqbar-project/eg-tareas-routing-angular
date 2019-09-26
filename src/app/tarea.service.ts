import { Injectable } from '@angular/core'
import { Tarea } from './tarea.domain'

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  tareasIds: number
  tareas: Array<Tarea>

  constructor() {
    this.tareasIds = 0
    this.tareas = []
  }

  crearTarea(description: string) {
    const tarea = new Tarea(description)
    tarea.id = this.tareasIds++
    return tarea
  }

  agregarTarea(tarea: Tarea) {
    this.tareas.push(tarea)
  }

  getTareaById(id: number) {
    return this.tareas.find((tarea) => {
      return tarea.id === id
    })
  }

}

@Injectable({
  providedIn: 'root'
})
export class StubTareaService extends TareaService {
  constructor() {
    super()
    this.tareas = [
      this.crearTarea('Aprender Angular'),
      this.crearTarea('Aprender Routing de Angular'),
      this.crearTarea('Desarrollar app en Angular')
    ]
  }
}

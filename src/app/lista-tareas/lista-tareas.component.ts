import { Component, OnInit } from '@angular/core'
import { TareaService } from '../tarea.service'
import { Tarea } from '../tarea.domain'

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: [ './lista-tareas.component.css' ]
})

export class ListaTareasComponent implements OnInit {

  descripcionTarea = ''
  tareas: Tarea[] = []
  tareaSeleccionada: Tarea | undefined

  constructor(private tareaService: TareaService) {}

  agregarTarea() {
    const tarea = this.tareaService.crearTarea(this.descripcionTarea)
    this.tareaService.agregarTarea(tarea)
    this.descripcionTarea = ''
  }

  ngOnInit() {
    this.tareas = this.tareaService.tareas
  }

}

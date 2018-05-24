import { Component, OnInit } from '@angular/core'
import { TareaService } from '../tarea.service'
import { Tarea } from '../tarea.domain'

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styles: [
    'div { margin-left: 10px; }'
  ]
})

export class ListaTareasComponent implements OnInit {

  descripcionTarea : string = ""
  tareas : Array<Tarea>
  tareaSeleccionada : Tarea
  
  constructor(private tareaService : TareaService) {
    this.tareas = this.tareaService.tareas
  }

  agregarTarea() {
    const tarea = this.tareaService.crearTarea(this.descripcionTarea)
    this.tareaService.agregarTarea(tarea)
    this.descripcionTarea = ''
  }

  ngOnInit() {}

}

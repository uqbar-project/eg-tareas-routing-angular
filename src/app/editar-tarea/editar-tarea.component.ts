import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { Tarea } from '../tarea.domain'
import { TareaService } from '../tarea.service'

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styles: []
})
export class EditarTareaComponent implements OnInit {

  tarea!: Tarea
  descripcionTarea!: string

  constructor(private tareaService: TareaService, private router: Router, private route: ActivatedRoute) {}

  navegarAHome() {
    this.router.navigate(['/listaTareas'])
  }

  aceptar() {
    this.tarea.descripcion = this.descripcionTarea
    this.router.navigate(['/editarTarea', this.tarea.id + 1])
  }

  aceptarYSalir() {
    this.tarea.descripcion = this.descripcionTarea
    this.navegarAHome()
  }

  cancelar() {
    this.navegarAHome()
  }

  ngOnInit() {
    this.route.params.subscribe((editarTareaParameters) => {
      const tarea = this.tareaService.getTareaById(editarTareaParameters['id'])
      if (!tarea) {
        this.navegarAHome()
      } else {
        this.tarea = tarea
        this.descripcionTarea = this.tarea?.descripcion
      }
    })
  }

}

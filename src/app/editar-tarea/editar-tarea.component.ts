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

  tarea: Tarea
  descripcionTarea: string

  constructor(private tareaService: TareaService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe((editarTareaParameters) => {
      this.tarea = this.tareaService.getTareaById(editarTareaParameters.id)
      if (!this.tarea) {
        this.navegarAHome()
      }
    })
  }

  navegarAHome() {
    this.router.navigate(['/listaTareas'])
  }

  aceptar() {
    this.tarea.descripcion = this.descripcionTarea
    this.navegarAHome()
  }

  cancelar() {
    this.navegarAHome()
  }

  ngOnInit() {
    this.descripcionTarea = this.tarea.descripcion
  }

}

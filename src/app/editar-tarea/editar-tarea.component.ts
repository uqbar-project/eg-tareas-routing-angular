import { Component, OnInit, Input } from '@angular/core'
import { TareaService } from '../tarea.service'
import { Router } from "@angular/router"
import { ActivatedRoute } from '@angular/router'
import { Tarea } from '../tarea.domain'

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styles: []
})
export class EditarTareaComponent implements OnInit {

  tarea : Tarea
  descripcionTarea : string

  constructor(private tareaService: TareaService, private router : Router, private route : ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.tarea = this.tareaService.getTareaById(params['id'])
      if (!this.tarea) {
        this.navegarAHome()
        return
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

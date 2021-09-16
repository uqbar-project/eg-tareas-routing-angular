import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ListaTareasComponent } from './lista-tareas/lista-tareas.component'
import { EditarTareaComponent } from './editar-tarea/editar-tarea.component'

export const routes: Routes = [
  { path: 'listaTareas', component: ListaTareasComponent },
  { path: 'editarTarea/:id', component: EditarTareaComponent },
  { path: '**', redirectTo: '/listaTareas', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  ListaTareasComponent,
  EditarTareaComponent
]

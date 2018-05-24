import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { ListaTareasComponent } from './lista-tareas/lista-tareas.component'
import { EditarTareaComponent } from './editar-tarea/editar-tarea.component'

const routes: Routes = [
  { path: '',                redirectTo: '/listaTareas', pathMatch: 'full' },
  { path: 'listaTareas',     component: ListaTareasComponent },
  { path: 'editarTarea/:id', component: EditarTareaComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ ListaTareasComponent, EditarTareaComponent ]
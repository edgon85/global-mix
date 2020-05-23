import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'inicio',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'categorias',
        loadChildren: () =>
          import('./pages/categorias/categorias.module').then(
            (m) => m.CategoriasModule
          ),
      },
      {
        path: 'proyectos',
        loadChildren: () =>
          import('./pages/proyectos/proyectos.module').then(
            (m) => m.ProyectosModule
          ),
      },
      {
        path: 'corporacion',
        loadChildren: () =>
          import('./pages/corporacion/corporacion.module').then(
            (m) => m.CorporacionModule
          ),
      },
      {
        path: 'contacto',
        loadChildren: () =>
          import('./pages/contacto/contacto.module').then(
            (m) => m.ContactoModule
          ),
      },
      {
        path: 'cotizador',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
      {
        path: '**',
        loadChildren: () =>
          import('./pages/page-not-found/page-not-found.module').then(
            (m) => m.PageNotFoundModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

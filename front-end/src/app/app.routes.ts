import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AddPasteComponent } from './components/add-paste/add-paste.component';
import { ShowPasteComponent } from './components/show-paste/show-paste.component';
import { PrivatePasteComponent } from './components/private-paste/private-paste.component';
//import { CharactersComponent } from './components/characters/characters.component';
//import { ShowCharacterComponent } from './components/show-character/show-character.component';

const APP_ROUTES: Routes = [

  {path: 'home', component: HomeComponent },
  {path: 'paste', component: AddPasteComponent },
  {path: 'paste/:uuid', component: ShowPasteComponent },
  {path: 'paste/:id/:uuid', component: PrivatePasteComponent },
  {path: '**', pathMatch: 'full', redirectTo: 'home' }

  ];

  export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
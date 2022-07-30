import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { RoomsLobbyComponent } from './rooms-lobby/rooms-lobby.component';
import { PageNotFoundComponent } from './error-page/error-room.component';

const routes: Routes = [
  { path: 'rooms-lobby', component: RoomsLobbyComponent },
  { path: 'game/:id', component: GameComponent },
  { path: '**', component: PageNotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

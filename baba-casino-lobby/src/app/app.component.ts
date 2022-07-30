import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { AudioService } from './services/audio-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Baba Ent Casino Lobby';
  public muted:boolean = true;
  constructor(private router: Router, private audioService: AudioService ) { }
 
  ngOnInit() {
    if(!this.muted) this.audioService.playBgAudio();
   
    this.router.navigate(['/rooms-lobby']);
  }
  muteSound(){
    this.muted = true;
    this.audioService.stopBgAudio();
  }
  unMuteSound(){
    this.muted = false;
    this.audioService.playBgAudio();
  }
}

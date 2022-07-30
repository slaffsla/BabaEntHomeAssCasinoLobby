import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  constructor() { }
  bgMusic = new Audio();
  chooseTheme = new Audio();
  win = new Audio();
  startSpin = new Audio();
  spinEnd = new Audio();
  click = new Audio();

  playBgAudio(): void {
    this.bgMusic.src = '../assets/audio/bg_theme.mp3';
    this.bgMusic.load();
    this.bgMusic.loop = true;
    this.bgMusic.play();
  }
  stopBgAudio(): void {
    this.bgMusic.pause();
  }
  playChooseTheme(): void {
    this.chooseTheme.src = '../assets/audio/choose.mp3';
    this.chooseTheme.load();
    this.chooseTheme.play();
  }
  playWin(): void {
    this.win.src = '../assets/audio/winning.mp3';
    this.win.load();
    this.win.play();
  }
  playStartSpin(): void {
    this.startSpin.src = '../assets/audio/allspin.mp3';
    this.startSpin.load();
    this.startSpin.play();
  }
  playEndSpin(){
    this.spinEnd.src = '../assets/audio/spin_end.mp3';
    this.spinEnd.load();
    this.spinEnd.play();
  }
  playClick(){
    this.click.src = '../assets/audio/spin.mp3';
    this.click.load();
    this.click.play();
  }
}
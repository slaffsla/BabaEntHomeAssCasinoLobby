import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AudioService } from '../services/audio-service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private audioService: AudioService,@Inject(DOCUMENT) private document: Document) {
  }
  public isSpinning: boolean = false;
  public totalBet: number = 1;
  public totalWin: number = 0;
  public myBalance: number = 77777;

  public displayPayTable: boolean = false;

  public r1Class: string = 'idle';
  public r2Class: string = 'idle';
  public r3Class: string = 'idle';
  public r4Class: string = 'idle';
  public r5Class: string = 'idle';

  public wheel1: string[] = [];
  public wheel2: string[] = [];
  public wheel3: string[] = [];
  public wheel4: string[] = [];
  public wheel5: string[] = [];

  public lastState1 = [];
  public lastState2 = [];
  public lastState3 = [];
  public lastState4 = [];
  public lastState5 = [];
  public gameId: any = 0;

  generateRandomWheel() {
    const imgPath: string = "../assets/slot-1128/symbol_";
    const rList: string[] = Array.from({ length: 24 }, () => (imgPath + Math.floor(Math.random() * 11 + 1) + '.png'));
    return rList;
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id !== '1128') {
      this.router.navigate(['/404']);
      return;
    }

    for (let i = 1; i < 6; i++) {
      this["wheel" + i] = [...this.generateRandomWheel()];
    }
  }

  currentIndex = 1;
  intervalInstance: any;


  animateSpin() {
    this.isSpinning = true;
    this.totalWin = 0;
    this.lastState1 = [this.wheel1[1], this.wheel1[2], this.wheel1[3]];
    this.lastState2 = [this.wheel2[1], this.wheel2[2], this.wheel2[3]];
    this.lastState3 = [this.wheel3[1], this.wheel3[2], this.wheel3[3]];
    this.lastState4 = [this.wheel4[1], this.wheel4[2], this.wheel4[3]];
    this.lastState5 = [this.wheel5[1], this.wheel5[2], this.wheel5[3]];

    for (let i = 1; i < 6; i++) {
      this["wheel" + i] = [...this.generateRandomWheel()];
      this["r" + i + "Class"] = 'idle';
      this["wheel" + i][21] = this["lastState" + i][0];
      this["wheel" + i][22] = this["lastState" + i][1];
      this["wheel" + i][23] = this["lastState" + i][2];
    }

    setTimeout(() => { this.r1Class = 'spinBottom' }, 90);
    setTimeout(() => { this.r2Class = 'spinBottom' }, 100);
    setTimeout(() => { this.r3Class = 'spinBottom' }, 95);
    setTimeout(() => { this.r4Class = 'spinBottom' }, 110);
    setTimeout(() => { this.r5Class = 'spinBottom' }, 150);
    setTimeout(() => { this.audioService.playEndSpin() }, 650);
    setTimeout(() => { this.showWin() }, 3000);
    setTimeout(() => { this.isSpinning = false }, 3500);
  }
  showWin(){
    this.audioService.playWin();
    this.totalWin = Math.floor(Math.random() * 999999 + 1);
    this.jackpot()
  }
  jackpot(){
    const winIcon1 = this.document.getElementById('r1').getElementsByTagName('img');
    const winIcon2 = this.document.getElementById('r2').getElementsByTagName('img');
    const winIcon3 = this.document.getElementById('r3').getElementsByTagName('img');
    const winIcon4 = this.document.getElementById('r4').getElementsByTagName('img');
    const winIcon5 = this.document.getElementById('r5').getElementsByTagName('img');


   const winLineCombinations = ['1,1,1,1,1','2,2,2,2,2','1,2,2,2,1'];
   //for (let i = 1; i < 6; i++) {
   // this["winIcon1" + i][winLineCombinations[0]].className = 'win';
  //  }
   winIcon1[1].className = 'win';
   winIcon2[1].className = 'win';
   winIcon3[1].className = 'win';
   winIcon4[1].className = 'win';
   winIcon5[1].className = 'win';
   setTimeout(() => {
    winIcon1[2].className = 'win';
    winIcon2[2].className = 'win';
    winIcon3[2].className = 'win';
    winIcon4[2].className = 'win';
    winIcon5[2].className = 'win';
    }, 1500);
    this.totalWin = Math.floor(Math.random() * 999999 + 1000000);
  }
  returnBack() {
    this.audioService.playClick();
    this.router.navigate(['/rooms-lobby']);
  }
  updateBetMinus() {
    this.audioService.playClick();
    if (this.totalBet > 0) this.totalBet -= 1
  }
  updateBetPlus() {
    this.audioService.playClick();
    this.totalBet += 1
  }
  showPayTable() {
    this.audioService.playClick();
    if(this.displayPayTable) {
      this.displayPayTable = false;
    }
    else{
      this.displayPayTable = true;
    }
  }
  setMaxBet() {
    this.audioService.playClick();
    this.totalBet = this.myBalance;
  }
  spin() {
    if (this.isSpinning) return;
    this.audioService.playStartSpin();
    this.animateSpin();
  }

}
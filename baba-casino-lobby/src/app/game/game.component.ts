import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AudioService } from '../services/audio-service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private audioService: AudioService, @Inject(DOCUMENT) private document: Document) {
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code == 'Space') {
      this.spin();
    }

  }
  public isSpinning: boolean = false;
  public totalBet: number = 1;
  public totalWin: number = 0;
  public myBalance: number = 1000;
  public totalLines: number = 25;
  public currentBet: number = 1;

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

  private playingWinAnim: boolean = false;
  private playingWinAnimTimeouts = [];
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

  clearAnimations() {
    this.clearCanvas();
    function updateClass(htmlObject: any, className: string) {
      for (let i = 0; i < htmlObject.length; i++) {
        htmlObject[i].className = className;
      }
    }
    updateClass(this.document.getElementById('wheels-wrapper').getElementsByTagName('img'), 'clean');
  }
  animateSpin() {
    this.playingWinAnimTimeouts.forEach((timeout) => { clearTimeout(timeout) });
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
      setTimeout(() => { this['r' + i + 'Class'] = 'spinBottom' }, Math.floor(Math.random() * 300));
    }
    setTimeout(() => { this.audioService.playEndSpin() }, 650);
    setTimeout(() => { this.endGame() }, 3000);

  }
  endGame() {
    const isWin = Math.floor(Math.random() * 2);
    (isWin) ? this.showWin() : setTimeout(() => { this.isSpinning = false }, 1000);
  }
  showWin() {
    this.audioService.playWin();
    this.totalWin = Math.floor(Math.random() * 999999 + 1);
    this.displayWinAnimations()
  }
  clearCanvas() {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  drawDemoWinLine(indexes) {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 4;
    ctx.beginPath();
    const winType = indexes.join();
    switch (winType) {
      case '1,1,1,1,1':
        ctx.moveTo(0, 25);
        ctx.lineTo(300, 25);
        break;
      case '2,2,2,2,2':
        ctx.strokeStyle = 'blue';
        ctx.moveTo(0, 75);
        ctx.lineTo(300, 75);
        break;
      case '3,3,3,3,3':
        ctx.strokeStyle = 'red';
        ctx.moveTo(0, 125);
        ctx.lineTo(300, 125);
        break;
      case '1,2,3,2,1':
        ctx.strokeStyle = 'darkblue';
        ctx.moveTo(0, 0);
        ctx.lineTo(150, 150);
        ctx.moveTo(150, 150);
        ctx.lineTo(300, 0);
        break;
      case '1,1,2,1,1':
        ctx.strokeStyle = 'orange';
        ctx.moveTo(0, 25);
        ctx.lineTo(125, 25);
        ctx.moveTo(125, 25);
        ctx.lineTo(150, 50);
        ctx.moveTo(150, 50);
        ctx.lineTo(175, 25);
        ctx.moveTo(175, 25);
        ctx.lineTo(300, 25);
        break;
      case '3,2,1,2,3':
        ctx.strokeStyle = 'darkgreen';
        ctx.moveTo(0, 150);
        ctx.lineTo(150, 25);
        ctx.moveTo(150, 25);
        ctx.lineTo(300, 150);
        break;

    }
    ctx.stroke();
  }
  setWinClassAnim(indexes = []) {
    this.clearAnimations();
    setTimeout(() => {
      this.winIcon1[indexes[0]].className = 'win';
      this.winIcon2[indexes[1]].className = 'win';
      this.winIcon3[indexes[2]].className = 'win';
      this.winIcon4[indexes[3]].className = 'win';
      this.winIcon5[indexes[4]].className = 'win';
      this.drawDemoWinLine(indexes);
    }, 1000);
  }
  private winIcon1: HTMLCollectionOf<HTMLImageElement>;
  private winIcon2: HTMLCollectionOf<HTMLImageElement>;
  private winIcon3: HTMLCollectionOf<HTMLImageElement>;
  private winIcon4: HTMLCollectionOf<HTMLImageElement>;
  private winIcon5: HTMLCollectionOf<HTMLImageElement>;

  displayWinAnimations() {
    this.winIcon1 = this.document.getElementById('r1').getElementsByTagName('img');
    this.winIcon2 = this.document.getElementById('r2').getElementsByTagName('img');
    this.winIcon3 = this.document.getElementById('r3').getElementsByTagName('img');
    this.winIcon4 = this.document.getElementById('r4').getElementsByTagName('img');
    this.winIcon5 = this.document.getElementById('r5').getElementsByTagName('img');
    // possible win lines for animations
    const winLineCombinations = [
      '1,1,1,1,1',
      '2,2,2,2,2',
      '3,3,3,3,3',
      '1,2,3,2,1',
      '1,1,2,1,1',
      '3,2,1,2,3'
    ];
    this.playingWinAnim = true;
    this.playingWinAnimTimeouts = [];
    for (let i = 0; i < winLineCombinations.length + 1; i++) {
      this.playingWinAnimTimeouts.push(setTimeout(() => {
        if (i === winLineCombinations.length) {
          this.playingWinAnim = false;
        } else {
          this.setWinClassAnim(winLineCombinations[i].split(','));
        }
      }, 3000 * i));
    }
    console.log('win anim timeouts', this.playingWinAnimTimeouts);
    setTimeout(() => { this.isSpinning = false }, 1000);
    this.totalWin = Math.floor(Math.random() * 999999 + 1000000);
  }
  returnBack() {
    this.audioService.playClick();
    this.router.navigate(['/rooms-lobby']);
  }
  updateBetMinus() {
    this.audioService.playClick();
    if (this.currentBet > 0) {
      this.currentBet -= 1
      this.setTotalBet();
    }
  }
  updateBetPlus() {
    this.audioService.playClick();
    this.currentBet += 1;
    this.setTotalBet();

  }
  setTotalBet() {
    this.totalBet = (this.currentBet * 25);
  }
  showPayTable() {
    this.audioService.playClick();
    if (this.displayPayTable) {
      this.displayPayTable = false;
    }
    else {
      this.displayPayTable = true;
    }
  }
  setMaxBet() {
    this.audioService.playClick();
    this.currentBet = 25;
    this.setTotalBet();
  }
  spin() {
    if (this.isSpinning) return;
    this.audioService.playStartSpin();
    this.clearAnimations();
    this.animateSpin();
  }

}

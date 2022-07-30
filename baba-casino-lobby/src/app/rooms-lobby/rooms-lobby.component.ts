import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameCard } from './GameCard';
import { Router } from '@angular/router';
import { AudioService } from '../services/audio-service';
@Component({
  selector: 'app-rooms-lobby',
  templateUrl: './rooms-lobby.component.html',
  styleUrls: ['./rooms-lobby.component.scss']
})

export class RoomsLobbyComponent implements OnInit {
  public slides: Array<GameCard> = [];
  public settingsLoaded: boolean = false;
  public count = {
    countTo: 100,
    from: 0,
    duration: 5
  };
  constructor(private http: HttpClient, private router: Router, private audioService: AudioService) { }
  fixMissing = (gameList: Array<any>) => {
    const badImageUrls: Array<String> = [
      'https://cdn.babacasino.net/common/master/assets/images/mainLobby/slotsIcons/icon_1145.png',
      'https://cdn.babacasino.net/common/master/assets/images/mainLobby/slotsIcons/icon_1128.png',
      'https://cdn.babacasino.net/common/master/assets/images/mainLobby/slotsIcons/icon_1132.png',
      'https://cdn.babacasino.net/common/master/assets/images/mainLobby/slotsIcons/icon_1130.png'
    ]
    gameList.forEach(function (item: GameCard) {
      if (badImageUrls.includes(item.image)) {
        item.image = 'https://cdn.babacasino.net/uploadImages/icon_1142.png'
      }
    });
    return gameList;
  }

  fetchSettings() {
    this.http.get<any>('https://www.baba-entertainment.com/public/home-assignment-data.json').subscribe(data => {
      this.slides = this.fixMissing(data.slots);
      this.slides.sort(this.compare);
      setTimeout(() => { this.settingsLoaded = true }, 1500);
    })
  }
  ngOnInit() {

    this.fetchSettings();
  }

  compare(a: any, b: any) {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  }

  ngAfterViewInit() {

  }

  dots = true;
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    prevArrow: "<img class='slick-prev' style='height:51px;width:35px;margin-left:-10px' src='../assets/lobby/arrow-left.png'>",
    nextArrow: "<img class='slick-next' style='height:51px;width:35px;margin-right:-10px'  src='../assets/lobby/arrow-right.png'>"
  };
  clicked(img: any) {
    console.log("clicked img " + img);
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  beforeChange(e: any) {
    this.audioService.playClick();
  }

  onClick(e: any, slide: any) {
    if (slide.isLocked) return;
    this.audioService.playChooseTheme();
    this.router.navigate(['/game/', slide.id]);
  }
}

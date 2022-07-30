export class GameCard {
    image: string
    id: number
    isLocked: boolean
    jackpot: number
    name: string
    order: number
    constructor(image:string,id:number,isLocked:boolean,jackpot:number,name:string,order:number){
      this.image = image;
      this.id = id;
      this.isLocked = isLocked
      this.jackpot = jackpot
      this.name = name
      this.order = order
  }
  }
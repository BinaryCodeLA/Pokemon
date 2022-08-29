import { Component,  OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  PokeResults:any
  PokeElments:any = []
  PokeNext:number = 1
  windowScrolled = false;

  constructor(private pokemon: PokemonService) {  }

  ngOnInit(): void {
       this.GetData()  
       window.addEventListener('scroll', () => {
        this.windowScrolled = window.pageYOffset !== 0;
      }); 
  }


  async GetData(){
    this.pokemon.getPokemons(this.PokeNext).then((response:any)=>{
      response.forEach(element => {
        this.PokeElments.push(element) 
      });
    }).catch((error)=>console.log("Error: ", error))       
    
  }
  async LoadMore(){
    this.PokeNext = this.PokeElments[this.PokeElments.length -1 ].id
    this.GetData();
  }
  scrollToTop(): void {
    return document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  }
}

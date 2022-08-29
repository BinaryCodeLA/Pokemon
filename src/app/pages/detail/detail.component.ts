import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id:string = ""
  PokemonName: string = ""
  PokemonImage: string = ""
  PokemonType: any = []
  PokemonDescription : string = ""
  constructor(private pokemon: PokemonService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || ""
    console.log("pokemon id: ", this.id)
    this.GetData(parseInt(this.id))
  }


  async GetData(id:number){
    this.pokemon.GetDetailPokemon(id).then((response:any)=>{
      this.PokemonName = response.pokemon[0].name
      this.PokemonImage = response.pokemon[0].image
      this.PokemonType = response.pokemon[0].types
      this.PokemonDescription =  response.effect[0].effect

    }).catch((error)=>console.log("Error: ", error))       
    
  }
}



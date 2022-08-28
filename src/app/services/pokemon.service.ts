import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseURL: string = environment.baseUrl
  private DataCount : number = 0
  private Datanext: string = ""
  private Dataprev: string = ""
  public DataPokemon: any
  constructor(private http: HttpClient) { }

  async getPokemons(index: number = 0) {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${this.baseURL}/pokemon/?limit=10&offset=${index}`)
        .subscribe(data => {
          this.DataCount = data.count
          this.Datanext = data.next
          this.Dataprev = data.previous
          this.DataPokemon = data.results.map(result => {          
            return <PokeResults>{
              id: this.GetIdElement(result.url),
              name: result.name.toString().charAt(0).toUpperCase() + result.name.slice(1).toLowerCase(),
              url: result.url,
              image: "",
              types: ""
            }
          })         
          this.DataPokemon.forEach(async (element) => {
            let data = await this.GetImagePokemon(element.id)
            element.image = data[0].toString()
            element.types = data[1]
          });
          if (this.DataPokemon != undefined || this.DataPokemon != null) {            
            resolve(this.DataPokemon)
          } else {
            reject(null)
          }
        })


    })
    
   
  }
  
  async GetImagePokemon(index:number){
    let url = ""
    let types = []
    let StringTypes : any = []
    let data = await this.http.get<any>(`${this.baseURL}/pokemon/${index}`).toPromise()
    url = data.sprites.other.dream_world.front_default   
    types = data.types;
    types.forEach((element: any) => {
      StringTypes.push({poketype : element.type.name.toString().toUpperCase()})
    });
    return [url,StringTypes]    
  }

  async GetinfoPokemon(index: number = 1){
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${this.baseURL}/pokemon/${index}`)
        .subscribe(data => {
          this.DataPokemon = data
          if (this.DataPokemon != undefined || this.DataPokemon != null) {
            resolve(this.DataPokemon)
          } else {
            reject(null)
          }
        })
    })
  }

  GetIdElement(value:string){
    let ArrayUrl = value.split("/")
    return ArrayUrl[ArrayUrl.length - 2]
  }

}


export interface PokeResults {
  id:string
  name: string
  url: string
  image: string,
  types: any
}

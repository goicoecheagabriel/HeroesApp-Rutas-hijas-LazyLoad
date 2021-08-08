import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [`
    .heroeResult{
      width: 100%;
      max-width: 650px;
      margin: 0 auto;
    }
  `
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = "";
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    
  }

  buscando(){
    if(this.termino.length === 0){
      this.heroes = [];
      return;
    }
    this.heroesService.getSugerencias( this.termino.trim() )
      .subscribe( heroes => {
        this.heroes = heroes;
        
      } )
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ){
    if(!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }
    
    const heroe: Heroe = event.option.value
    this.termino = heroe.superhero;

    this.heroesService.getHeroePorId(heroe.id!)
      .subscribe( heroe => this.heroeSeleccionado = heroe )

  }

}

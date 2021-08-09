import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {

    if( !this.router.url.includes('editar') ) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap( ({id})=> this.heroesService.getHeroePorId( id ) )
      )
      .subscribe( heroe => this.heroe = heroe )
  }

  guardar(){
    if( this.heroe.superhero.trim().length === 0 ){
      console.log('El campo superhero es obligatorio')
      return;
    }

    if( this.heroe.id ){
      // Actualizar
      this.heroesService.actualizarHeroe( this.heroe )
        .subscribe( heroe => this.mostrarSnakbar('Registro actualizado') )
    } else {
      // Crear
      this.heroesService.agregarHeroe( this.heroe )
        .subscribe( (heroe: Heroe) => {
          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnakbar(`Registro creado: ${ heroe.superhero }`);
        } )
    }

  }

  borrarHeroe( ){
    const dialogBorrar = this._matDialog.open( ConfirmarComponent, {
      width: '400px',
      data: { ...this.heroe }, // Esta forma es por si solo queremos enviar una copia del objeto y no una referencia al mismo
    } );
    dialogBorrar.afterClosed().subscribe( result => {
      console.log('Resultado de dialog:', result);
      if( !result ) return;
      
      this.heroesService.borrarHeroe( this.heroe.id! )
      .subscribe( ( resp ) => {
        this.router.navigate(['/heroes']);
      } )

    } )
    
    
  }

  mostrarSnakbar( mensaje: string ): void {
    this._snackBar.open( mensaje, 'Ok!', {
      duration: 2500
    } )
  }

}

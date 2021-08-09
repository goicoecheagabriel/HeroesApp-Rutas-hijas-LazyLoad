import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [`
  button{
    margin-right: 10px
  }
  `
  ]
})
export class ConfirmarComponent implements OnInit {

  constructor(
    private _matDialogRef: MatDialogRef<ConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroe
  ) {  }

  ngOnInit(): void {
  }

  borrar(){
    this._matDialogRef.close(true);
  }

  cerrar(){
    this._matDialogRef.close(false);
  }
}

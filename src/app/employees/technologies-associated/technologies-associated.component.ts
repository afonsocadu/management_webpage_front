import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-technologies-associated',
  templateUrl: './technologies-associated.component.html',
  styleUrls: ['./technologies-associated.component.scss']
})
export class TechnologiesAssociatedComponent implements OnInit {
  protected _technologiesAssociated: string[] = [];
  protected _employee: string = '';


  constructor(
    public dialogRef: MatDialogRef<TechnologiesAssociatedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  ngOnInit(): void {
    if (this.data.technologies) {
      this._technologiesAssociated = this.data.technologies.technologies.map((technology: any) => technology)
      this._employee = this.data.technologies.user_name;
    }
  }

  protected _closeModal(){
    this.dialogRef.close();
  }
}

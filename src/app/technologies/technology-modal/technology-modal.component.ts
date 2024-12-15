import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { technology, technologyModalData } from './technology-modal-types';

@Component({
  selector: 'app-technology-modal',
  templateUrl: './technology-modal.component.html',
  styleUrls: ['./technology-modal.component.scss']
})
export class TechnologyModalComponent implements OnInit {
  protected _technologyName: string = '';
  protected _isSubmitDisabled: boolean = false;
  private _technologyList: technology[] = [];

  constructor(
    public dialogRef: MatDialogRef<technologyModalData>,
    @Inject(MAT_DIALOG_DATA) public data: technologyModalData,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this._technologyList = this.data.technologyList;
      this._technologyName = this.data.updatedField ? this.data.updatedField.name : '';
    }
  }

  public onSubmit(){ 
    const technologyName = { name: this._technologyName }
    this.dialogRef.close(technologyName);
   }

  public onCancel(){
    this.dialogRef.close();
  } 
}

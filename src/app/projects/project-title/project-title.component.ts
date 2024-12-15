import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-title',
  templateUrl: './project-title.component.html',
  styleUrls: ['./project-title.component.scss']
})
export class ProjectTitleComponent implements OnInit {
  public boardData: { title: string } = { title: '' }
  protected _isSubmitDisabled: boolean = false;
  protected _title: string = '';

  constructor(
    public dialogRef: MatDialogRef<ProjectTitleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    if (this.data.project.title) {
      this.boardData.title = this.data.project.title
    }
  }

  public onSubmit(){
    this.dialogRef.close(this.boardData);
  }

  public onCancel() {
  }
}

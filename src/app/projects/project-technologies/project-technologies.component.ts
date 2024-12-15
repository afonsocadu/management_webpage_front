import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeModalComponent } from 'src/app/employees/employee-modal/employee-modal.component';
import { projectModalData } from '../project-modal/project-modal-types';

@Component({
  selector: 'app-project-technologies',
  templateUrl: './project-technologies.component.html',
  styleUrls: ['./project-technologies.component.scss']
})
export class ProjectTechnologiesComponent implements OnInit {
  public technologiesCheckboxes: { name: string, select: boolean }[] = [];
  public boardData: { technologies: string[]} = { technologies: [] }


  constructor(public dialogRef: MatDialogRef<EmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: projectModalData
  ) { }

  ngOnInit(): void {
    if(this.data) {
      this._createTechnologiesCheckbox(this.data);
    }
  }

  public onSubmit(){
    const technologies = this.boardData.technologies;

    const data = { technologies: technologies }; 

    this.dialogRef.close(data);
  }

  public onCancel(){
    this.dialogRef.close();
  }

  protected _changeTechnologiesCheckbox(technology: {name: string, select: boolean}) {
    const isSelected = !technology.select;

    const index = this.boardData.technologies.indexOf(technology.name);

    if (isSelected && index == -1) {
      this.boardData.technologies.push(technology.name);
    } else if (!isSelected && index != -1) {
      this.boardData.technologies.splice(index, 1);
    }
  }

  private _createTechnologiesCheckbox(data: any) {
    if (data.project.technologies) {
      const selectedTechnologies = data.project.technologies;
  
      data.technologies.forEach((tec: string) => {
        const isSelected = selectedTechnologies.includes(tec);
        this.technologiesCheckboxes.push({ name: tec, select: isSelected });
        if (isSelected) {
          this.boardData.technologies.push(tec)
        }
      });
    } 
  }
}

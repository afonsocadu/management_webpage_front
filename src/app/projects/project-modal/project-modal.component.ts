import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeModalComponent } from 'src/app/employees/employee-modal/employee-modal.component';
import { projectModalData } from './project-modal-types';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {
  private _projectList: string[] = [];
  protected _isSubmitDisabled: boolean = false;
  public boardData: { title: string, technologies: string[]} = { title: '', technologies: [] }
  public employeesCheckboxes: { name: string, select: boolean }[] = [];
  public technologiesCheckboxes: { name: string, select: boolean }[] = [];

  constructor(
    public dialogRef: MatDialogRef<EmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: projectModalData
  ) { }

  ngOnInit() {
    if (this.data) {
      this._createTechnologiesCheckbox(this.data);
      this._projectList = this.data.projectList.map((item: { title: string }) => item.title);
    }
  }

  public onSubmit(){
    const title = this.boardData.title;
    const technologies = this.boardData.technologies;
    const data = { title: title, technologies: technologies }; 

    this.dialogRef.close(data);
  }

  public onCancel(){
    this.dialogRef.close();
  }

  public _changeTechnologiesCheckbox(technology: { name: string, select: boolean }) {
    const isSelected = !technology.select;

    const index = this.boardData.technologies.indexOf(technology.name);

    if (isSelected && index == -1) {
      this.boardData.technologies.push(technology.name);
    }else if (!isSelected && index != -1) {
      this.boardData.technologies.splice(index, 1);
    }
  }
  
  private _createTechnologiesCheckbox(data: any) {
    if (!this.data.technologyList) {
      return;
    }
    if (data.updatedField) {
      const selectedTechnologies = data.updatedField.technologies;
  
      data.technologyList.forEach((tec: string) => {
        const isSelected = selectedTechnologies.includes(tec);
        this.technologiesCheckboxes.push({ name: tec, select: isSelected });
      });
    } else {
      data.technologyList.forEach((tec: string) => {
        this.technologiesCheckboxes.push({ name: tec, select: false });
      });
    }
  }
}
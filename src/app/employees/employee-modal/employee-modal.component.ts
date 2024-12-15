import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { employeeModalData } from './employee.modal-types';
@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {
  public boardData: { id: number ,user_name: string, technologies: any } = { id: 0, user_name: '', technologies: [] };
  public userName: string = '';
  public checkboxes: { name: string, select: boolean }[] = [];

  public selectedProject: string = '';
  protected _projectList: string[] = [];

  public selectedTechnology: string[] = [];
  protected _technologyList: string[] = [];

  constructor( 
    public dialogRef: MatDialogRef<EmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: employeeModalData,
    ) { }

   ngOnInit() {
    if (this.data) {
      this._checkIfModalIsUpdated();
      this._projectList = this.data.projectList;
      this._technologyList = this.data.technologyList;
      this._createCheckbox();
    } 
  }

  public onSubmit() {
    this.boardData.user_name = this.userName;
    this.dialogRef.close(this.boardData);
  }

  public onUserNameChange(event: any): void {
    this.boardData.user_name = event.target.value;
  }

  public onTechnologyChange(event: MatSelectChange): void {
    this.boardData.technologies = event.value;
  } 

  public onCancel(){
    this.dialogRef.close();
  }

  /**
 * Checks if the modal data is updated and updates internal properties accordingly.
 */
  private _checkIfModalIsUpdated(): void {
    if (this.data.employee) {
      this.userName = this.data.employee.user_name;
      this.selectedProject = this.data.employee.project;
      this.selectedTechnology = this.data.employee.technologies;
      this.boardData = { id: this.data.employee.id, user_name: this.userName, technologies: this.selectedTechnology };
    }  
  }

  protected _changeCheckbox(technology: { name: string, select: boolean }) {
    const isSelected = !technology.select;
    
    const index = this.boardData.technologies.indexOf(technology.name);

    if (isSelected && index == -1) {
      this.boardData.technologies.push(technology.name);
    } else if (!isSelected && index != -1) {
      this.boardData.technologies.splice(index, 1);
    }
  }

  protected _createCheckbox(){
    for (const technology of this._technologyList) {
      const isSelected = this.boardData.technologies.includes(technology);
      this.checkboxes.push({ name: technology, select: isSelected });
    }
  }
}

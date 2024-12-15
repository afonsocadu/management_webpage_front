import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeModalComponent } from 'src/app/employees/employee-modal/employee-modal.component';
import { projectModalData } from '../project-modal/project-modal-types';

@Component({
  selector: 'app-project-employees',
  templateUrl: './project-employees.component.html',
  styleUrls: ['./project-employees.component.scss']
})
export class ProjectEmployeesComponent implements OnInit {
  public employeesCheckboxes: { name: string, select: boolean }[] = [];
  public boardData: { employees: string[] } = { employees: [] }

  constructor(
    public dialogRef: MatDialogRef<EmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: projectModalData
  ) { }

  ngOnInit(): void {
    if(this.data) {
+      this._createEmployeesCheckbox(this.data);
    }
  }

  public onSubmit(){
    const employees = this.boardData.employees;

    const data = { employees: employees }; 

    this.dialogRef.close(data);
  }

  public onCancel(){
    this.dialogRef.close();
  }

  protected _changeEmployeesCheckbox(employee: { select: boolean; name: string; }) {
    const isSelected = !employee.select;

    const index = this.boardData.employees.indexOf(employee.name);
    if (isSelected && index == -1) {
      this.boardData.employees.push(employee.name);
    }else if (!isSelected && index != -1) {
      this.boardData.employees.splice(index, 1);
    }
  }

  private _createEmployeesCheckbox(data: any) {
    if (data.project.associatedEmployees.length > 0) {
      data.project.associatedEmployees.forEach((employee: any) => {
        if (!this._employeeExists(employee, this.employeesCheckboxes)) {
          this.employeesCheckboxes.push({ name: employee, select: true })
          this.boardData.employees.push(employee);
        }
      });
    }

    if (data.project.employeesAvailable) {
      data.project.employeesAvailable.forEach((employee: any) => {
        if (!this._employeeExists(employee, this.employeesCheckboxes)) {
          this.employeesCheckboxes.push({ name: employee, select: false })
        }
      });
    }
  }

  private _employeeExists(employee: string, checkboxes: { name: string, select: boolean }[]): boolean {
    return checkboxes.some((checkbox: { name: string, select: boolean }) => checkbox.name === employee);
  }
}

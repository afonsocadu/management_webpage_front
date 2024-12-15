import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TechnologiesService } from './technologies.service';
import { TechnologyModalComponent } from './technology-modal/technology-modal.component';
import { technologyData } from './technologies-type';
import { lastValueFrom } from 'rxjs';

  @Component({
    selector: 'app-technologies',
    templateUrl: './technologies.component.html',
    styleUrls: ['./technologies.component.scss']
  })
  export class TechnologiesComponent implements OnInit {
    protected _technologies: string[] = [];
    protected _dataSource: MatTableDataSource<any>;
    protected _displayedColumns: string[] = ['name', 'actions'];


    constructor(private _technologiesService: TechnologiesService, private _dialog: MatDialog) {
      this._dataSource = new MatTableDataSource<any>([]); 
    }

    async ngOnInit() {
      await this._technologyList()
    }

    private async _technologyList() {
      const technologies: any = await lastValueFrom(this._technologiesService.listTechnologies());

      if (!technologies) {
        return;
      }

      this._technologies = technologies.map((technology: technologyData) => ({
        id: technology.id,
        name: technology.name
      })); 

      this._dataSource.data = this._technologies;
    }

    protected async _createTechnology() {
      const dialogRef = this._dialog.open(TechnologyModalComponent,{
        width: '500px',
        data: { technologyList: this._technologies },
        panelClass: 'modal-container'
      })

      dialogRef.afterClosed().subscribe( async  (result) => {
        if(!result){
          return;
        }

        const response = await lastValueFrom(this._technologiesService.createTechnology(result));
  
        if(response){
          await this._technologyList();
        }
      })
    }

    protected editTechnology(technology: {id: number, name: string}){
      const dialogRef = this._dialog.open(TechnologyModalComponent,{
        width: '500px',
        data: { technologyList: this._technologies, updatedField: technology },
        panelClass: 'modal-container'
      })

      dialogRef.afterClosed().subscribe(async (result) => {
        if(!result){
          return;
        }

        const response = await lastValueFrom(this._technologiesService.updateTechnology(technology.id, result));
      
        if(response){
          await this._technologyList();
        }
      })
    }

    protected async _deleteTechnology(technologyId: number){
      const response = await lastValueFrom(this._technologiesService.deleteTechnology(technologyId));
      
      if(response){
        await this._technologyList();
      }
    }
  }

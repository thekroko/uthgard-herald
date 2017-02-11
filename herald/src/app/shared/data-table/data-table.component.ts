import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
//import {SmallPlayerData} from '../player-data/small-player-data';

import {Subject} from 'rxjs/Subject';

@Component({
    templateUrl: './data-table.component.html',
    selector: 'data-table',
})
export class DataTableComponent implements OnInit{
    @Input()
    dataListener: Subject<any>;

    @Input()
    headerConversions: {keyName: string, displayName: string}[];

    @Input()
    hiddenColumns: string[];

    @Output()
    headerClickEmitter: EventEmitter<string> = new EventEmitter<string>();

    currentData: any[] = [];
    currentCols: string[] = [];

    ngOnInit(){
        this.dataListener.subscribe((data) => {
            console.log('heard some data on child component');
            console.dir(data);
            this.updateData(data);
        });
    }

    convertHeader(headerKey: string){
        let matchObject = this.headerConversions.find((element) => {return element.keyName === headerKey}) || {displayName: headerKey};
        return matchObject.displayName;
    }

    columnIsHidden(keyName: string): boolean{
        let foundKey =  this.hiddenColumns.indexOf(keyName);
        return foundKey !== -1;
    }

    headerClick(headerText: string){
        console.log(`header ${headerText} clicked`);
        this.headerClickEmitter.emit(headerText);
    }
    
    updateData(data: any[]){
        this.currentData = data;
        this.currentCols = this.getColumnsFromData(data);
    }

    getColumnsFromData(data: any[]){
        let validKeys = {};
        for (let i = 0; i < data.length; i++){
            let thisDataItem = data[i];
            for (let key in thisDataItem){
                validKeys[key] = true;
            }  
        }
        console.log(validKeys);
        console.log('keys:');
        console.log(Object.keys(validKeys));
        return Object.keys(validKeys); 
    }
}

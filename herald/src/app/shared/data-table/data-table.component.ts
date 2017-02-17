import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
//import {SmallPlayerData} from '../player-data/small-player-data';

import {Subject} from 'rxjs/Subject';

@Component({
    templateUrl: './data-table.component.html',
    selector: 'data-table',
    styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit{
    @Input()
    dataListener: Subject<any>; //listens for data coming in

    @Input()
    headerConversions: {keyName: string, displayName: string}[]; //converts the format of headers

    @Input()
    hiddenColumns: string[]; //used to hide particular columns

    @Output()
    headerClickEmitter: EventEmitter<string> = new EventEmitter<string>(); //sends events when headers are clicked

    currentData: any[] = []; //current data is an array of objects
    currentCols: string[] = []; //used to store the keys against which columns can be formed

    ngOnInit(){
        this.dataListener.subscribe((data) => {
            this.updateData(data);
        });
    }

    /**
    * converts a header between the key name and it's display name, if there is one
    * @param headerKey the key of the header to be converted
    * @returns         the converted key, or the original, if there was no match
    */
    convertHeader(headerKey: string){
        let matchObject = this.headerConversions.find((element) => {return element.keyName === headerKey;}) || {displayName: headerKey};
        return matchObject.displayName;
    }

    /**
    * checks whether or not the column is hidden
    * @param keyName the key of the header to be checked
    * @returns       whether or not the column is hidden
    */
    columnIsHidden(keyName: string): boolean{
        let foundKey =  this.hiddenColumns.indexOf(keyName);
        return foundKey !== -1;
    }

    /**
    * provides a function which will emit an event for a header click
    * @param headerText the text of the header which was clicked
    */
    headerClick(headerText: string){
        this.headerClickEmitter.emit(headerText);
    }

    /**
    * sets the currentData to the data provided, and creates the relevant columns for that data
    * @param data should be an array of objects
    */
    updateData(data: any[]){
        this.currentData = data;
        this.currentCols = this.getColumnsFromData(data);
    }

    /**
    * sets the columns from the data provided
    * @param data should be an array of objects
    */
    getColumnsFromData(data: any[]){
        let validKeys = {};
        for (let i = 0; i < data.length; i++){
            let thisDataItem = data[i];
            for (let key in thisDataItem){
                validKeys[key] = true;
            }
        }
        return Object.keys(validKeys);
    }
}

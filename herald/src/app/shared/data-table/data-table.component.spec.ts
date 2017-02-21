/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, Component} from '@angular/core';

import { DataTableComponent } from './data-table.component';
import {Subject} from 'rxjs';

describe('DataTableComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let table: HTMLTableElement;
  let tBody: HTMLTableSectionElement;
  let tHead: HTMLTableSectionElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableComponent, TestHostComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;

    table = fixture.debugElement.query(By.css('table')).nativeElement;
    tHead = fixture.debugElement.query(By.css('thead')).nativeElement;
    tBody = fixture.debugElement.query(By.css('tbody')).nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //todo more tests when this thing is done
  /*
  it('should add rows to the table', () => {
    component.tableData.next(new TestThing('a', 'b', 'c', 'd', 'e'));
    component.tableData.next(new TestThing('v', 'w', 'x', 'y', 'z'));

    expect(tBody.rows.length).toEqual(2);
  });
*/

});


@Component({
  template: `<herald-data-table [hiddenColumns]="hiddenCols" [headerConversions]="headers" [dataListener]="tableData"></herald-data-table>`
})

class TestHostComponent {
  hiddenCols: string[] = ['hide1', 'hide2'];

  headers: {keyName: string, displayName: string}[] = [
    {keyName: 'keyThing3', displayName: 'Thing3'},
    {keyName: 'keyThing4', displayName: 'Thing4'},
    {keyName: 'keyThing5', displayName: 'Thing5'},
  ];

  tableData: Subject<TestThing> = new Subject<TestThing>();

}

class TestThing {
  public keyThing1: string;
  public keyThing2: string;
  public keyThing3: string;
  public keyThing4: string;
  public keyThing5: string;

  constructor(keyThing1: string, keyThing2: string, keyThing3: string, keyThing4: string, keyThing5: string) {
    this.keyThing1 = keyThing1;
    this.keyThing2 = keyThing2;
    this.keyThing3 = keyThing3;
    this.keyThing4 = keyThing4;
    this.keyThing5 = keyThing5;
  }
}

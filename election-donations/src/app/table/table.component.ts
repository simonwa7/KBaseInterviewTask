import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input('title') title: string;
  @Input('dataTitle') dataTitle: string;
  @Input('data') data: any[];
  headers: string[] = [];
  
  constructor() { }

  ngOnInit() {
    if(this.dataTitle == "Candidates"){
      this.headers = ["ID", "Candidate Name(s)", "Party", "Donations Raised"]
    }

  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
    candidates: string[][] = [];
    donations: string[][] = [];

    constructor() { }

    ngOnInit() {
    }

    uploadCandidates(event) {
      var reader = new FileReader();
      reader.readAsText(event.target.files[0]);
      var me = this;

      reader.onload = function (ev: any) {

        var allTextLines = ev.target.result.split(/\r\n|\n/);
            
          for (var i=0; i<allTextLines.length; i++) {
              var data = allTextLines[i].split('|');
                  var tarr = [];
                  for (var j=0; j<data.length; j++) {
                      tarr.push(data[j]);
                  }
                  if((tarr[5] == "P") && (tarr[3] == "2016")){
                    me.candidates.push(tarr[0]);
                  }
          }

          console.log(me.candidates)

        }
    }

    uploadDonations(event) {
      var reader = new FileReader();
      reader.readAsText(event.target.files[0]);
      var me = this;

      reader.onload = function (ev: any) {

        var allTextLines = ev.target.result.split(/\r\n|\n/);
            
          for (var i=0; i<allTextLines.length; i++) {
              var data = allTextLines[i].split('|');
                  var tarr = [];
                  for (var j=0; j<data.length; j++) {
                      tarr.push(data[j]);
                  }
                  if(tarr[6] == "COM"){
                    if(me.candidates.includes(tarr[16])){
                      me.donations.push(tarr);
                    }
                  }
          }

          console.log(me.donations)
          me.sortDonations()
          console.log(me.donations)

        }
    }
  
    sortDonations(){
      this.donations.sort( function(candidate1, candidate2) {
        if ( candidate1[7] < candidate2[7] ){
          return -1;
        }else if( candidate1[7] > candidate2[7] ){
          return 1;
        }else{
          return 0;
        }
      });
    }

}

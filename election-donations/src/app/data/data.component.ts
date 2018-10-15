import { Component, OnInit } from '@angular/core';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
    candidates: string[] = [];
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
          console.log("Candidates")
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

          me.sortDonations()
          console.log("Donations")
          console.log(me.donations)

          me.limitCandidates()
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

    // step 1: get id
    limitCandidates(){
      var candidates_with_donors = this.candidatesWithDonors();
      console.log(candidates_with_donors)
      var num_removed = 0;

      for(var index = 0; index < this.candidates.length;){
        if(!(candidates_with_donors.includes(this.candidates[index]))){
          this.candidates.splice(index, 1);
          num_removed++;
        }else{
          index++;
        }
      }

      console.log(num_removed)
      console.log(this.candidates)
    }

    candidatesWithDonors(){
      var candidates: string[] = [];

      for(var index = 0; index < this.donations.length; index++){
        if(!candidates.includes(this.donations[index][16])){
          candidates.push(this.donations[index][16])
        }
      }

      return candidates
    }

}

import { Component, OnInit } from '@angular/core';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
    candidates: any[][] = [];
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
                  tarr.push(0);
                  if((tarr[5] == "P") && (tarr[3] == "2016")){
                    me.candidates.push(tarr);
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

                    for(var index=0; index<me.candidates.length; index++){
                      if(me.candidates[index][0] == tarr[16]){
                        me.donations.push(tarr);
                        break;
                      }
                    }

                  }
          }

          console.log("Donations")
          console.log(me.donations)

          me.limitCandidates()
          me.calculateTotalDonations()

          console.log(me.candidates)
        }
    }

    // step 1: get id
    limitCandidates(){
      var candidates_with_donors = this.candidateIDsWithDonors();
      console.log(candidates_with_donors)
      var num_removed = 0;

      for(var index = 0; index < this.candidates.length;){

        if(!(candidates_with_donors.includes(this.candidates[index][0]))){
          this.candidates.splice(index, 1);
          num_removed++;
        }else{
          index++;
        }

      }

      console.log(num_removed)
      console.log(this.candidates)
    }

    candidateIDsWithDonors(){
      var candidateIDs: string[] = [];

      for(var index = 0; index < this.donations.length; index++){
        if(!candidateIDs.includes(this.donations[index][16])){
          candidateIDs.push(this.donations[index][16])
        }
      }

      return candidateIDs
    }

    calculateTotalDonations(){
      for(var index=0; index<this.donations.length; index++){
        for(var cand_index = 0; cand_index<this.candidates.length; cand_index++){
          if(this.donations[index][16] == this.candidates[cand_index][0]){
            console.log(this.donations[index][14], this.candidates[cand_index][1])
            this.candidates[cand_index][15] += +this.donations[index][14]
          }
        }
      }
    }

}

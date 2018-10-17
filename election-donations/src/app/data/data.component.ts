import { Component, OnInit, Input } from '@angular/core';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
    @Input('title') title: string;
    candidates: any[][] = [];
    donations: string[][] = [];
    showHistogram: boolean = false;
    histogramData: any[] = [];

    constructor() { }

    ngOnInit() {
    }

    /*  This function occurs on the event of a file load through the 
          Candidates input tag. On the load of a file in the correct
          format, this function will parse the resulting text file
          to create "candidate" objects and push them into the 
          candidates array as long as they are running for the 2016 
          presidential election.*/
    uploadCandidates(event) {

      var reader = new FileReader();
      reader.readAsText(event.target.files[0]);
      var me = this;

      reader.onload = function (ev: any) {

        // splits text into lines
        var allTextLines = ev.target.result.split(/\r\n|\n/);
            
          for (var i=0; i<allTextLines.length; i++) {

              // for each line, split each section by the "|" delimeter
              var data = allTextLines[i].split('|');
              var singleCandidate = [];

              // loop through each section of the line and add to the
              // individual candidate object
              for (var j=0; j<data.length; j++) {
                  singleCandidate.push(data[j]);
              }

              // last item in the array will contain the donation total
              // (intialized to zero)
              singleCandidate.push(0);

              // If candidate is running in the 2016 presidential election
              if((singleCandidate[5] == "P") && (singleCandidate[3] == "2016")){
                me.candidates.push(singleCandidate);
              }
          }
          console.log("Candidates")
          console.log(me.candidates)
        }
    }

    /*  This function occurs on the event of a file load through the 
          Donations input tag. On the load of a file in the correct
          format, this function will parse the resulting text file
          to create "donor" objects and push them into the 
          donations array as long as they are donations made by 
          committees.*/
    uploadDonations(event) {

      var reader = new FileReader();
      reader.readAsText(event.target.files[0]);
      var me = this;

      reader.onload = function (ev: any) {

        // splits text into lines
        var allTextLines = ev.target.result.split(/\r\n|\n/);
            
          for (var i=0; i<allTextLines.length; i++) {

              // for each line, split each section by the "|" delimeter
              var data = allTextLines[i].split('|');
              var donor = [];

              // loop through each section of the line and add to the
              // individual donor object
              for (var j=0; j<data.length; j++) {
                donor.push(data[j]);
              }
              
              // Check if the donor is under the committee tag
              if(donor[6] == "COM"){

                for(var index=0; index<me.candidates.length; index++){

                  // loop through the candidates array and look for a candidate
                  // ID that matches the donation. If a match is found, add the
                  // donor to the donations array. 
                  if(me.candidates[index][0] == donor[16]){
                    me.donations.push(donor);
                    break;
                  }
                }

              }
          }

          // remove candidates that did not receive donations
          me.limitCandidates()

          // sum donations to each candidate
          me.calculateTotalDonations()

          // sort candidates by donations
          me.sortCandidates()

          console.log("Donations")
          console.log(me.donations)
          console.log("Limited Candidates")
          console.log(me.candidates)
        }
    }

    /* This function is designed to remove candidates from the candidate array
          If they did not receive and donations. */
    limitCandidates(){
      // get the ID numbers of all candidates that have donors 
      var candidates_with_donors = this.candidateIDsWithDonors();

      for(var index = 0; index < this.candidates.length;){

        // loop through the candidates array and remove candidates if their ID
        // number is not included in the candidates_with_donors array
        if(!(candidates_with_donors.includes(this.candidates[index][0]))){
          this.candidates.splice(index, 1);
        }else{
          // if they did receive a donation, continue to the next one
          index++;
        }
      }
    }

    /* This function is designed to loop through the donations array and 
          return a list of ID numbers that correspond to all the candidates
          who received a donation.*/
    candidateIDsWithDonors(){
      var candidateIDs: string[] = [];

      for(var index = 0; index < this.donations.length; index++){
        // Add a candidate's ID number to the list if it is not already
        // contained in the list
        if(!candidateIDs.includes(this.donations[index][16])){
          candidateIDs.push(this.donations[index][16])
        }
      }
      return candidateIDs
    }

    /* This function is designed to sum up the donations made to each candidate
          and store the final sum in the last entry of the candidates array. */
    calculateTotalDonations(){

      // for each donation...
      for(var index=0; index<this.donations.length; index++){

        // for each candidate...
        for(var cand_index = 0; cand_index<this.candidates.length; cand_index++){

          // if the donation ID matches the candidate ID, add the donation to the 
          // candidates donation sum value
          if(this.donations[index][16] == this.candidates[cand_index][0]){
            this.candidates[cand_index][15] += +this.donations[index][14]
          }
        }
      }
    }

    /* This function is designed to sort the candidates list by the amount of
          donations they have received */
    sortCandidates(){
      this.candidates.sort( function(candidate1, candidate2) {
        if ( candidate1[15] > candidate2[15] ){
          return -1;
        }else if( candidate1[15] < candidate2[15] ){
          return 1;
        }else{
          return 0;
        }
      });
    }

    reassignCandidateData(){
      this.showHistogram = true

      for(var i=0; i<this.candidates.length; i++){
        var candidate = {"name": this.candidates[i][1], "value": this.candidates[i][15]};
        this.histogramData.push(candidate);
      }
    }
}

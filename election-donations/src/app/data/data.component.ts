import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
    donations: string[][] = [];
    private fileText;

    constructor() { }

    ngOnInit() {
    }

    fileUpload(event) {
      var reader = new FileReader();
      reader.readAsText(event.target.files[0]);
      var me = this;
  
      reader.onload = function (ev) {
        // console.log(ev.target.result)
  
        // var allTextLines = ev.target.result.split(/\r\n|\n/);
            
            // for (var i=0; i<allTextLines.length; i++) {
            //     var data = allTextLines[i].split('|');
            //         var tarr = [];
            //         for (var j=0; j<data.length; j++) {
            //             tarr.push(data[j]);
            //         }
            //         if(tarr[3] == "G"){
            //           me.donations.push(tarr);
            // }
            // me.donations.push(tarr)
        }
      }
  
    // sortDonations(){
    //   this.donations.sort( function(candidate1, candidate2) {
    //     if ( candidate1[7] < candidate2[7] ){
    //       return -1;
    //     }else if( candidate1[7] > candidate2[7] ){
    //       return 1;
    //     }else{
    //       return 0;
    //     }
    //   });
    // }

}

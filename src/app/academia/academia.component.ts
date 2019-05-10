import { Component, OnInit } from '@angular/core';

declare var $:any;


@Component({
  selector: 'app-academia',
  templateUrl: './academia.component.html',
  styleUrls: ['./academia.component.css']
})
export class AcademiaComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    //  Init Bootstrap Select Picker
    if ($(".selectpicker").length != 0) {
      $(".selectpicker").selectpicker({
        iconBase: "nc-icon", 
        tickIcon: "nc-check-2"
       });
    }  
    
  }

}

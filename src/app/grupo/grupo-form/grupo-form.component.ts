import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.css']
})
export class GrupoFormComponent implements OnInit {

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

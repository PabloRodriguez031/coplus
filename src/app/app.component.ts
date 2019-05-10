import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDxnGarz_EcZ9mV71nw9TDKK2UmnCv7x7w",
      authDomain: "panel-coplus.firebaseapp.com",
      databaseURL: "https://panel-coplus.firebaseio.com",
      projectId: "panel-coplus",
      storageBucket: "panel-coplus.appspot.com",
      messagingSenderId: "171184374814"
  })
  }
}

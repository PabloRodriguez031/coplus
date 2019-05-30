import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    constructor() { }

    getDocumentos(coleccion: string){
        return firebase.firestore().collection(coleccion).get();
    }

    getDocumentoById(coleccion: string, id){
        return firebase.firestore().collection(coleccion).doc(id).get();
    }    

    addDocumento(coleccion: string, documento: any) {
        return firebase.firestore().collection(coleccion).doc().set(documento);
    }

    deleteDocumento(coleccion: string, documento: any) {
        return firebase.firestore().collection(coleccion).doc(documento.id).delete();        
    } 

    updateDocumento(coleccion: string, documento: any, id) {        
        return firebase.firestore().collection(coleccion).doc(id).update(documento);    
    }

}
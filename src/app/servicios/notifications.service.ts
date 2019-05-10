import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

declare var $: any;

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {


  constructor() { }

/**
     *
     * @param from: top, bottom
     * @param align: left, center, right
     * @param type: '', info, success, warning, danger
     * @param text: Message
     */
    showNotification(from, align, type, text) {
      $.notify({
              icon: 'fa fa-info',
              message: text
          },
          {
              type: type,
              timer: 4000,
              placement: {
                  from: from,
                  align: align
              },
              template: '<div data-notify="container" class="col-11 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                  '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">' +
                  '<i class="nc-icon nc-simple-remove"></i>' +
                  '</button>' +
                  '<span data-notify="icon" class="fa fa-info"></span> ' +
                  '<span data-notify="title">{1}</span> ' +
                  '<span data-notify="message">{2}</span>' +
                  '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">' +
                  '</div>' +
                  '</div>' +
                  '   <a href="{3}" target="{4}" data-notify="url"></a>' +
                  '</div>'
          });
  }

  /**
   *
   * @param title
   * @param message
   * @param type success, error, warning, info, question
   */
  showSwal(title: string, message: string, type: any) {

      swal.fire({
          title: title,
          text: message,
          type: type,
          confirmButtonClass: 'btn btn-success',
          buttonsStyling: false
      });
  }

  showConfirmationSwal() {
      return swal.fire({
          title: '¿Está seguro?',
          text: 'Esto no se puede deshacer',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          confirmButtonClass: 'btn btn-success',
          cancelButtonClass: 'btn btn-danger',
          buttonsStyling: false
      });
  }


  showLoadingSwal(title: string, text: string) {
      swal.fire({
          title: title,
          text: text
      });
      swal.showLoading();
  }

  hideLoadingSwal() {
      swal.close();
  }


}

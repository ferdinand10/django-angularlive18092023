import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public showSuccess(title: string, message: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
    });
  }

  public showError(title: string, message: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
    });
  }

  public showWarning(title: string, message: string) {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
    });
  }

  public comfirmDialogue(title:string,message:string){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui,supprimer',
      cancelButtonText: 'Non, Annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Supprimé!',
          'la donnée a été supprimée avec succès.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Annulé',
          'Suppression annulée:)',
          'error'
        )
      }
    })
  }

  public ShowErrorWithImage(title:string,message:string){
    Swal.fire({
      title: title,
      text: message,
      imageUrl: 'assets/img/custom/notificationModalError.png',
      imageWidth: 350,
      imageHeight: 250,
      imageAlt: 'notification image',
    })
  }

  public ShowSuccessWithImage(title:string,message:string){
    Swal.fire({
      title: title,
      text: message,
      imageUrl: 'assets/img/custom/notificationModalSuccess.avif',
      imageWidth: 305,
      imageHeight: 305,
      imageAlt: 'notification image',
    })
  }

  public TopEndDialogue(title:string,position:string,message:string){
    Swal.fire({
      position: 'top-end',
      text:message,
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }
  
}

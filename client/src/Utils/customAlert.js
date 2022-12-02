import Swal from 'sweetalert2';

const customAlert = (text) => {
  return Swal.fire({
    icon: 'error',
    text: text,
    showConfirmButton: true,
    buttonsStyling: false,
    customClass: {
      container: 'customAlert-container',
      popup: 'customAlert-container',
      title: 'customAlert-title',
      confirmButton: 'customAlert-button',
    },
  });
};

export default customAlert;

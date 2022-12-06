import Swal from 'sweetalert2';

export const deleteAlert = () => {
  return Swal.fire({
    text: '글을 정말 삭제할까요? 삭제한 글은 다시 되돌릴 수 없습니다.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    buttonsStyling: false,
    customClass: {
      container: 'customAlert-container',
      popup: 'customAlert-container',
      title: 'customAlert-title',
      confirmButton: 'customAlert-button',
      cancelButton: 'customAlert-button2',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      return Swal.fire({
        text: '삭제가 완료되었습니다.',
        icon: 'success',
        confirmButtonText: '확인',
        buttonsStyling: false,
        customClass: {
          container: 'customAlert-container',
          popup: 'customAlert-container',
          title: 'customAlert-title',
          confirmButton: 'customAlert-button',
        },
      });
    }
  });
};

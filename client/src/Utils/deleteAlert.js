import Swal from 'sweetalert2';

export const deleteAlert = () => {
  return Swal.fire({
    title: '정말 삭제하시겠습니까?',
    text: '다시 되돌릴 수 없습니다',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
  }).then((result) => {
    if (result.isConfirmed) {
      return Swal.fire({
        title: '삭제가 완료되었습니다',
        icon: 'success',

        confirmButtonText: '확인',
      });
    }
  });
};

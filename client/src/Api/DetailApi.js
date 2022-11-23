import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 삭제 api
export const useConfirm = (message = null, onConfirm, onCancel) => {
  if (!onConfirm || typeof onConfirm !== 'function') {
    return;
  }
  if (onCancel && typeof onCancel !== 'function') {
    return;
  }

  const confirmAction = () => {
    if (window.confirm(message)) {
      axios
        .delete(`/main/1/delete`)
        .then((res) => {
          const navigate = useNavigate();
          navigate(`/`);
          console.log(res);
        })
        .catch((err) => console.error(err));
      onConfirm();
    } else {
      onCancel();
    }
  };

  return confirmAction;
};

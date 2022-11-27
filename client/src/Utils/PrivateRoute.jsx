import { useState } from 'react';
import { useSelector } from 'react-redux';
import Login from '../Pages/Login';

const PrivateRoute = ({ component: Component, id: id }) => {
  const { authenticated, memberId } = useSelector((state) => ({
    authenticated: state.user.authenticated,
    memberId: state.user.memberId,
  }));
  const [isMyEdit, setIsMyEdit] = useState(false);
  if (memberId === id) {
    setIsMyEdit(true);
  }
  return isMyEdit ? Component : <Login />;
};

export default PrivateRoute;

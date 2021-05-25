import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getStationsThunk, getUserTokenThunk } from '../redux';
import { LS_KEY, ROUTE } from '../constants';
import { setLocalStorage } from '../utils';

const useSignIn = () => {
  const { token, error } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (token) {
      setLocalStorage(LS_KEY.TOKEN, token);
      history.push(ROUTE.HOME.PATH);
      dispatch(getStationsThunk());
    }
  }, [token, history, dispatch]);

  const signIn = ({ email, password }) =>
    dispatch(getUserTokenThunk({ email, password }));

  return { signIn, error };
};

export default useSignIn;

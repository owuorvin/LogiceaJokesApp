import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getToken = (): string | null => {
    return localStorage.getItem('token'); // Retrieve the token from local storage
  };

export const setToken = (token: string): void => {
  cookies.set('token', token, { path: '/' });
};

export const removeToken = (): void => {
  cookies.remove('token', { path: '/' });
};

import axios, { AxiosResponse, AxiosError } from 'axios';

export interface LoginType {
  email: string;
  password: string;
}

class LoginRequest {
  login = async (input: LoginType): Promise<AxiosResponse | undefined> => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_REQUEST_API}/auth/login`, input);
      return response;
    } catch (error) {
      console.error('Error during login:', error);
      return undefined;
    }
  };
}

export default LoginRequest;

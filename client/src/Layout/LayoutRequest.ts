import axios, { AxiosResponse, AxiosError } from 'axios';

class LayoutRequest {

  userInfo = async (): Promise<AxiosResponse|{data :{success:boolean}} > => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_REQUEST_API}/api/userInfo`, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      return {data:{success:false}};
    }
  };

}

export default LayoutRequest;

import axios, { AxiosResponse, AxiosError } from 'axios';

export interface ItemType {
  name: string;
  _id?:string;
}
class HomeRequest {
  list = async (): Promise<AxiosResponse | undefined> => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_REQUEST_API}/api/list`, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      console.error('Error during list request:', error);
      return undefined;
    }
  };

  addToList = async (input: ItemType): Promise<AxiosResponse | undefined> => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_REQUEST_API}/api/list/create`, input, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      console.error('Error during addToList request:', error);
      return undefined;
    }
  };

  editList = async (input: ItemType): Promise<AxiosResponse | undefined> => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_REQUEST_API}/api/list/edit`, input, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      console.error('Error during addToList request:', error);
      return undefined;
    }
  };

  deleteList = async (_id:string): Promise<AxiosResponse | undefined> => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_REQUEST_API}/api/list/delete`, {_id}, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      console.error('Error during delete request:', error);
      return undefined;
    }
  };

}

export default HomeRequest;

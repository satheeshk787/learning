import React, { Component } from 'react';
import HomeRequest, { ItemType } from './HomeRequest';
import AddItem from './components/AddItem';
import './Home.css'
import EditItem from './components/EditItem';
import { Button } from '@mui/material';


interface HomeState {
  dataList: ItemType[];
  loading: boolean;
  editModalOpen: boolean;
  editValues: {
    name: string|undefined;
    _id: string|undefined;
  }
}

class Home extends Component<{}, HomeState> {
  state = {
    dataList: [],
    loading: true,
    editModalOpen:false,
    editValues: {
      name: '',
      _id: ''
    }
  };

  componentDidMount() {
    this.requestList();
  }

  handleEditClose = () => this.setState({ editModalOpen: false });
  handleEditOpen = (name:string|undefined, _id:string|undefined) => {
    this.setState({ 
      editModalOpen: true,
      editValues :{
        name,
        _id
      }
    });

    // console.log(this.state.editValues);
    
  };

  requestList = async () => {
    const request = new HomeRequest();

    try {
      const response = await request.list();
      this.setState({ dataList: response?.data.list, loading: false });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  render() {
    const { dataList, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      // onClick={()=>{item._id && this.removeList(item._id)}}
      <div>
        <h1>Hello this is new list!</h1>
        <AddItem onAddSuccessChange={(success)=>{ success && this.requestList()}} />
        <EditItem editValues={this.state.editValues} handleClose={this.handleEditClose} isOpen={this.state.editModalOpen} onEditSuccessChange={(success)=>{ success && this.requestList()}}/>
        <ul className='lists'>
          {dataList.map((item: ItemType) => (
          <li
              onClick={item ? () => this.handleEditOpen(item.name, item._id) : undefined}
              className='list-items'
              key={item._id}
          >
           {item.name}
          </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;

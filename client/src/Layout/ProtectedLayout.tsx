import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import './Layout.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LayoutRequest from './LayoutRequest';

class ProtectedLayout extends React.Component {
  state = {
    auth: false,
    loading: true
  };

  componentDidMount() {
    this.userInfo();
  }

  userInfo = async () => {
    const layoutRequest = new LayoutRequest();

    try {
      const response = await layoutRequest.userInfo();
      this.setState({loading:false});
      if (response?.data.success != false && response?.data?.user?._id) {
        this.setState({ auth: true });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  render() {
    const { auth } = this.state;

    if(this.state.loading) {
      return <>Loading...</>
    }

    return (
      auth ? (
        <main>
          <Header />
          <div className='container'><Outlet /></div>
          <Footer />
        </main>
      ) : (
        <Navigate to="/login" />
      )
    );
  }
}

export default ProtectedLayout;

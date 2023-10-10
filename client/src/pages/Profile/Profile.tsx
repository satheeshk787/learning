import { useEffect, useState } from 'react';
import LayoutRequest from '../../Layout/LayoutRequest';

interface UserInfo {
  user: {
    name: string;
    email: string;
  };
}

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const layoutRequest = new LayoutRequest();

      try {
        const response = await layoutRequest.userInfo();
        if (response?.data.success !== false && response?.data?.user?._id) {
          setLoading(false);
          setUserInfo(response?.data);
        } else {
          console.error('Error fetching data:', response?.data.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <>Loading user info...</>;
  }

  return (
    <div>
      <div>Name : <b>{userInfo?.user.name}</b></div>
      <div>Email : <b>{userInfo?.user.email}</b></div>
    </div>
  );
};

export default Profile;

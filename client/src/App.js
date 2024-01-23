import {useState} from 'react';
import Main from './components/Main';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Notifications from './components/Notifications';

const uri = `/api`;

export default function App() {
  const [data, setData] = useState([]);
  const [notifications, setNotifications] = useState('');
  const [privatePost, setPrivatePost] = useState(false);

  return (
    <div className="App">
      <NavBar
        privatePost={privatePost}
        uri={uri}
        data={data}
        setData={setData}
        setNotifications={setNotifications}
      />
      <Main
        privatePost={privatePost}
        setPrivatePost={setPrivatePost}
        uri={uri}
        data={data}
        setData={setData}
        setNotifications={setNotifications}
      />
      {notifications && (
        <Notifications
          notifications={notifications}
          setNotifications={setNotifications}
        />
      )}
      <Footer />
    </div>
  );
}

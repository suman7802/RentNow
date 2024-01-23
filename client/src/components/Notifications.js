import {useEffect} from 'react';
export default function Notifications({notifications, setNotifications}) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNotifications('');
    }, 3000); // 3sec time out
    return () => clearTimeout(timeoutId);
  }, [notifications, setNotifications]);

  return (
    <div className="notifications">
      <span className="notifications-text">{notifications}</span>
    </div>
  );
}

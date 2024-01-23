import axios from 'axios';
import {useState, useEffect} from 'react';

export default function NavBar({
  privatePost,
  uri,
  data,
  setData,
  setNotifications,
}) {
  const [query, setQuery] = useState('');

  function handleQuery(value) {
    setQuery(value);
  }

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        const url = privatePost
          ? `${uri}/property/private`
          : query
          ? `${uri}/property/query?location=${query}`
          : `${uri}/property`;
        const res = privatePost
          ? await axios.get(url)
          : await axios.get(url, {signal: controller.signal});
        const dataArray = Object.values(res.data);
        setData(dataArray);
      } catch (error) {
        if (error.name !== 'CanceledError') {
          console.error(error);
          if (error.message === 'Network Error') {
            setNotifications('Network Error');
          } else {
            setNotifications(error?.message);
          }
        }
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [query, setData, setNotifications, uri, privatePost]);

  return (
    <nav className="navbar">
      <span className="logo">RentNow</span>
      <div className="query-div">
        <input
          className="query-input"
          type="text"
          placeholder="Search by location"
          value={query}
          onChange={(e) => handleQuery(e.target.value)}
        />
        {query && data && (
          <p className="query-result">{data.length} Results found</p>
        )}
      </div>
    </nav>
  );
}

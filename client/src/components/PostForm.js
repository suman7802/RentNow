import axios from 'axios';
import React, {useState} from 'react';

export default function PostForm({
  privatePost,
  setPrivatePost,
  uri,
  setLogin,
  setData,
  setNotifications,
}) {
  const [formData, setFormData] = useState({
    address: '',
    bhk: '',
    room: '',
    rent: '',
    images: [],
    description: '',
    contact: {
      email: '',
      phoneNumber: '',
    },
  });

  const handleLogout = () => {
    document.cookie = 'rentNow=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setNotifications('Logout success');
    setLogin(false);
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    const updatedFormData = name.includes('contact.')
      ? {
          ...formData,
          contact: {
            ...formData.contact,
            [name.split('.')[1]]: value,
          },
        }
      : {
          ...formData,
          [name]: value,
        };
    setFormData(updatedFormData);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) return alert(`You can only upload 5 images.`);
    setFormData({
      ...formData,
      images: files,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setNotifications('creating post...');
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images') {
          value.forEach((file, index) => {
            formDataToSend.append(`image${index + 1}`, file);
          });
        } else if (key === 'contact') {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });

      const response = await axios.post(`${uri}/property`, formDataToSend);

      if (response.status === 201) {
        setData((prevData) => [response.data, ...prevData]);
        setNotifications('Post created successfully');
        setFormData({
          address: '',
          bhk: '',
          room: '',
          rent: '',
          images: [],
          description: '',
          contact: {
            email: '',
            phoneNumber: '',
          },
        });
      }
    } catch (error) {
      console.error('Error:', error);
      if (error?.response?.status === 400) {
        setNotifications('Please fill  provide details properly');
      } else if (error.message === 'Network Error') {
        setNotifications('Network Error');
      }
    }
  }

  return (
    <>
      <div className="post-container">
        <form className="post-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="bhk"
            placeholder="BHK"
            value={formData.bhk}
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="room"
            placeholder="Rooms"
            value={formData.room}
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="rent"
            placeholder="Rent in rupees Per month"
            value={formData.rent}
            onChange={handleInputChange}
          />

          <input
            type="email"
            name="contact.email"
            placeholder="Email"
            value={formData.contact.email}
            onChange={handleInputChange}
          />

          <input
            type="tel"
            name="contact.phoneNumber"
            placeholder="Contact number"
            value={formData.contact.phoneNumber}
            onChange={handleInputChange}
          />

          <textarea
            name="description"
            placeholder="Description.."
            value={formData.description}
            onChange={handleInputChange}
          />

          <span className="up-to-5-images">upto 5 images</span>
          <label htmlFor="fileInput">
            <input
              type="file"
              id="fileInput"
              multiple
              onChange={handleImageChange}
            />
          </label>

          <button type="submit" className='post-btn'>Post</button>
        </form>
      </div>
      <div className="post-container logout-div">
        <button
          onClick={() => setPrivatePost((e) => !e)}
          className="logout-btn">
          {privatePost ? 'Public Posts' : 'My Posts'}
        </button>
      </div>
      <div className="post-container logout-div">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </>
  );
}

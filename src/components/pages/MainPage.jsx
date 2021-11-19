import React, { useState, useEffect } from 'react';
import axios from 'axios';

import useAuth from '../../hooks/index.js';
import routes from '../../routes.js';

const getAuthHeader = (auth) => {
  const user = JSON.parse(auth.getUserToken());

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

const MainPage = () => {
  const [chatChannels, setChatChannels] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  const auth = useAuth();
  const headers = getAuthHeader(auth);

  useEffect(() => {
    const fetchChannels = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers });
      const { channels, messages } = data;

      console.log(channels);
      console.log(messages);
      setChatChannels(data);
      setChatMessages(messages);
    };

    fetchChannels();
  }, []);

  return <h1>MainPage</h1>;
};

export default MainPage;

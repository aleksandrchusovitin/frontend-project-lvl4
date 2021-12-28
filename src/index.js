import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';

import init from './init.jsx';

const app = () => {
  const instanceSocket = io();
  const root = document.getElementById('chat');

  init(instanceSocket)
    .then((vdom) => {
      ReactDOM.render(vdom, root);
    });
};
app();

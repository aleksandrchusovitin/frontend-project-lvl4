import AddChannel from './AddChannel.jsx';

const modals = {
  addingChannel: AddChannel,
};

export default (modalName) => modals[modalName];

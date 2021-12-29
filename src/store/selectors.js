export const getCurrentChannelName = (state) => {
  const { channels, currentChannelId } = state.channelsReducers;
  const currentChannel = channels.find((c) => c.id === currentChannelId);
  return currentChannel?.name;
};

export const getMessagesForCurrentChannel = (state) => {
  const { messages } = state.messagesReducers;
  const { currentChannelId } = state.channelsReducers;
  return messages
    .filter((m) => m.channelId === currentChannelId);
};

export const getCurrentChannelId = (state) => {
  const { currentChannelId } = state.channelsReducers;
  return currentChannelId;
};

export const getChannels = (state) => {
  const { channels } = state.channelsReducers;
  return channels;
};

export const getChannelsNames = (state) => {
  const { channels } = state.channelsReducers;
  const channelsNames = channels.map((c) => c.name);
  return channelsNames;
};

export const getChannelWithActionId = (state) => {
  const { id } = state.channelsReducers.channelWithAction;
  return id;
};

export const getPrevChannelName = (state) => {
  const { channelWithAction } = state.channelsReducers;
  return channelWithAction.name;
};

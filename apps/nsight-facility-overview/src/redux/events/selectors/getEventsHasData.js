const getEventsHasData = (state) => {
  const { eventFeedList } = state;
  if (eventFeedList) {
    return eventFeedList.items.length > 0;
  }
  return false;
};

export default getEventsHasData;

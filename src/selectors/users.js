export const fetchUsersInSurroundingArea = (users, bounds, authId) => {
  return users
    .filter(({ location }) => {
      if (location) {
        return bounds.contains(new google.maps.LatLng(location.geo));
      }
    })
    .filter(({ _id }) => _id !== authId);
};

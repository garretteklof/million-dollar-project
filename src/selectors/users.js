export const fetchUsersInSurroundingArea = (users, bounds) => {
  return users
    .filter(({ location }) => {
      if (location) {
        return bounds.contains(new google.maps.LatLng(location.coordinates));
      }
    })
    .filter(({ email }) => email !== "test@test.com");
};

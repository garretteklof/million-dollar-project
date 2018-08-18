export const fetchUsersInSurroundingArea = (users, bounds) => {
  return users
    .filter(({ location }) => {
      if (location) {
        return bounds.contains(new google.maps.LatLng(location.geo));
      }
    })
    .filter(({ email }) => email !== "test@test.com");
};

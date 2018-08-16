export const fetchUsersInSurroundingArea = (users, bounds) => {
  return users
    .filter(({ locationCoordinates }) =>
      bounds.contains(new google.maps.LatLng(locationCoordinates))
    )
    .filter(({ email }) => email !== "test@test.com");
};

async function GuestSession() {
  const response = await fetch(
    'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=abe1b6d231e3ee2948c3e5c3b33166fd'
  );
  const responseJson = await response.json();
  return responseJson;
}

export default GuestSession;

To run, add a _config.json_ file to the _server/config_ folder with the necessary keys - (signup for Google Maps API key [here](https://developers.google.com/maps/documentation/javascript/get-api-key#step-1-get-an-api-key-from-the-google-cloud-platform-console)).

An example of _config.json_:

```json
{
  "development": {
    "PORT": 3000,
    "MONGODB_URI": "LINK TO YOUR LOCAL MONGO INSTANCE",
    "GOOGLE_MAPS_API_KEY": "GOOGLE MAPS API GOES HERE",
    "JWT_SECRET": "THIS CAN BE ANY STRING"
  }
}
```

Then, in two separate shell windows:

`yarn install && yarn run dev-server`

`yarn start`

You will also need a shell window running the Mongo daemon:

`mongod`

App will running on port 8080.

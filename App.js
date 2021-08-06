import React, { useState, useEffect, useRef } from 'react';

import { View, StatusBar } from 'react-native';

// Estilizações e configurações
import { styles } from './src/styles'
import { mapStyle } from './src/config/mapStyle.json'
import { googleApi } from './src/config/index.json'

// Bibliotecas
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';

export default function App() {

  // Definição de estados da origem e do destino
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const mapEl = useRef(null);

  // Permisssão para pegar a localização do úsuario
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.000922,
        longitudeDelta: 0.000421
      })
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar/>

      {/* Visualização do Mapa */}
      <MapView
        style={styles.map}
        customMapStyle={mapStyle}
        initialRegion={origin}
        showsUserLocation={true}
        loadingEnabled={true}
        // zoomEnabled={false}
        ref={mapEl}
      >
        {/* Visualização da rota no mapa */}
        {destination &&
          <MapViewDirections
            lineDashPattern={[0]}
            origin={origin}
            destination={destination}
            apikey={googleApi}
            strokeWidth={5}
            strokeColor="hotpink"
            onReady={result => {
              mapEl.current.fitToCoordinates(
                result.fitToCoordinates, {
                  edgePadding: {
                    top: 50,
                    bottom: 50,
                    left: 50,
                    right: 50
                  }
                }
              )
            }}
          />
        }
      </MapView>

      {/* Visualização da barra de pesquisa */}
      <View style={styles.search}>
        <GooglePlacesAutocomplete
          placeholder='Para onde vamos?'
          onPress={(data, details = null) => {
            setDestination({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            });
          }}
          query={{
            key: googleApi,
            language: 'pt-br',
          }}
          enablePoweredByContainer={false}
          fetchDetails={true}
          styles={
            {listView: {height: 100}}
          }
        />
      </View>

    </View>
  );
}



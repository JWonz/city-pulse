import {MapView} from '@deck.gl/core';
import mapboxgl from 'mapbox-gl';

import {MapboxOverlay} from '@deck.gl/mapbox';
import {Deck} from '@deck.gl/core';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz


// const LOCAL_GEO = 'http://localhost:16969/getGeoJson';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiandvbnoiLCJhIjoiY2w4YjYyZ21nMDAweTN4cWNueWNwZXpkayJ9.LHlu-Qb99LMUEC1VAs52Uw';

// const INITIAL_VIEW_STATE = {
//   latitude: 39.9612,
//   longitude: -82.95,
//   zoom: 11,
//   bearing: 0,
//   pitch: 30
// };

// const mapBackground = new GeoJsonLayer({
//   id: 'base-map',
//   // data: COUNTRIES,
//   data: COUNTRIES,
//   // Styles
//   stroked: true,
//   filled: true,
//   lineWidthMinPixels: 2,
//   opacity: 0.4,
//   getLineColor: [60, 60, 60],
//   getFillColor: [200, 200, 200]
// });

// const countryLayer = new GeoJsonLayer({
//   id: 'cbus-map',
//   // data: COUNTRIES,
//   data: LOCAL_GEO,
//   // Styles
//   stroked: true,
//   filled: true,
//   lineWidthMinPixels: 2,
//   opacity: 0.4,
//   getLineColor: [60, 60, 60],
//   getFillColor: [200, 200, 200]
// });

// export const deck = new Deck({
//   initialViewState: INITIAL_VIEW_STATE,
//   controller: true,
//   layers: [
//     // mapBackground,
//     countryLayer
//   ]
// });

// const deck = new Deck({
//   map: false,
//   viewState: INITIAL_VIEW_STATE,
//   layers: [
//     // mapBackground,
//     countryLayer
//   ]
// });

// const mapboxglMap = new mapboxgl.Map({
//   container: 'map-container',
//   style: 'mapbox://styles/mapbox/dark-v9',
//   center: [-122.4194, 37.7749],
//   zoom: 12,
//   accessToken: MAPBOX_ACCESS_TOKEN
// });
//
// mapboxglMap.addLayer(countryLayer);

// mapboxglMap.addLayer({
//     id: 'deck-map',
//     type: 'custom',
//     renderingMode: '3d',
//     onAdd: (map, gl) => {
//       deck.setProps({gl});
//     }
// });

// const mapView = new MapView({
//   gl: deck.canvas,
//   width: '100%',
//   height: '100%',
//   mapboxApiAccessToken: MAPBOX_ACCESS_TOKEN,
//   mapStyle: 'mapbox://styles/mapbox/dark-v9',
//   onViewStateChange: ({viewState}) => {
//     deck.setProps({viewState});
//   }
// });

// mapboxglMap.on('move', () => {
//   mapView.setProps({
//     viewState: {
//       longitude: mapboxglMap.getCenter().lng,
//       latitude: mapboxglMap.getCenter().lat,
//       zoom: mapboxglMap.getZoom()
//     }
//   });
// });
//
// mapboxglMap.on('moveend', () => {
//   deck.setProps({
//     viewState: {
//       longitude: mapboxglMap.getCenter().lng,
//       latitude: mapboxglMap.getCenter().lat,
//       zoom: mapboxglMap.getZoom()
//     }
//   });
// });

// For automated test cases
/* global document */
document.body.style.margin = '0px';


mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
const map = new mapboxgl.Map({
  container: 'map',
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-82.95, 39.9612],
  zoom: 10,
  maxZoom: 30
});

map.on('load', () => {
  const layers = map.getStyle().layers;
// Find the index of the first symbol layer in the map style.
  let firstSymbolId;
  for (const layer of layers) {
    if (layer.type === 'symbol') {
      firstSymbolId = layer.id;
      break;
    }
  }

  map.addSource('cbus-0', {
    'type': 'geojson',
    'data': 'http://localhost:16969/getGeoJson?partition=0'
  });
  map.addLayer(
      {
        'id': 'cbus-0',
        'type': 'fill',
        'source': 'cbus-0',
        'layout': {},
        'paint': {
          'fill-color': '#020101',
          'fill-opacity': 0.4
        }
// This is the important part of this example: the addLayer
// method takes 2 arguments: the layer as an object, and a string
// representing another layer's name. If the other layer
// exists in the style already, the new layer will be positioned
// right before that layer in the stack, making it possible to put
// 'overlays' anywhere in the layer stack.
// Insert the layer beneath the first symbol layer.
      },
      firstSymbolId
  );

    map.addSource('cbus-1', {
        'type': 'geojson',
        'data': 'http://localhost:16969/getGeoJson?partition=1'
    });
    map.addLayer(
        {
            'id': 'cbus-1',
            'type': 'fill',
            'source': 'cbus-1',
            'layout': {},
            'paint': {
                'fill-color': '#f08',
                'fill-opacity': 0.4
            }
        },
        firstSymbolId
    );

    map.addSource('cbus-2', {
        'type': 'geojson',
        'data': 'http://localhost:16969/getGeoJson?partition=2'
    });
    map.addLayer(
        {
            'id': 'cbus-2',
            'type': 'fill',
            'source': 'cbus-2',
            'layout': {},
            'paint': {
                'fill-color': '#7300ff',
                'fill-opacity': 0.4
            }
        },
        firstSymbolId
    );

    map.addSource('cbus-3', {
        'type': 'geojson',
        'data': 'http://localhost:16969/getGeoJson?partition=3'
    });
    map.addLayer(
        {
            'id': 'cbus-3',
            'type': 'fill',
            'source': 'cbus-3',
            'layout': {},
            'paint': {
                'fill-color': '#0022ff',
                'fill-opacity': 0.4
            }
        },
        firstSymbolId
    );

    map.addSource('cbus-4', {
        'type': 'geojson',
        'data': 'http://localhost:16969/getGeoJson?partition=4'
    });
    map.addLayer(
        {
            'id': 'cbus-4',
            'type': 'fill',
            'source': 'cbus-4',
            'layout': {},
            'paint': {
                'fill-color': '#00d798',
                'fill-opacity': 0.4
            }
        },
        firstSymbolId
    );

    map.addSource('cbus-5', {
        'type': 'geojson',
        'data': 'http://localhost:16969/getGeoJson?partition=5'
    });
    map.addLayer(
        {
            'id': 'cbus-5',
            'type': 'fill',
            'source': 'cbus-5',
            'layout': {},
            'paint': {
                'fill-color': '#258a00',
                'fill-opacity': 0.4
            }
        },
        firstSymbolId
    );

    map.addSource('cbus-6', {
        'type': 'geojson',
        'data': 'http://localhost:16969/getGeoJson?partition=6'
    });
    map.addLayer(
        {
            'id': 'cbus-6',
            'type': 'fill',
            'source': 'cbus-6',
            'layout': {},
            'paint': {
                'fill-color': '#c7a703',
                'fill-opacity': 0.4
            }
        },
        firstSymbolId
    );

    map.addSource('cbus-7', {
        'type': 'geojson',
        'data': 'http://localhost:16969/getGeoJson?partition=7'
    });
    map.addLayer(
        {
            'id': 'cbus-7',
            'type': 'fill',
            'source': 'cbus-7',
            'layout': {},
            'paint': {
                'fill-color': '#ff5900',
                'fill-opacity': 0.4
            }
        },
        firstSymbolId
    );

    map.addSource('cbus-8', {
        'type': 'geojson',
        'data': 'http://localhost:16969/getGeoJson?partition=8'
    });
    map.addLayer(
        {
            'id': 'cbus-8',
            'type': 'fill',
            'source': 'cbus-8',
            'layout': {},
            'paint': {
                'fill-color': '#ff0000',
                'fill-opacity': 0.4
            }
        },
        firstSymbolId
    );

});
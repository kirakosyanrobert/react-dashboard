import React, { Component } from 'react';

import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { circular } from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';
import {Style, Icon, Fill} from 'ol/style';

import Zoom from 'ol/control/Zoom';
import * as MapEvents from 'ol/events';
import Control from 'ol/control/Control';
import { Interaction } from 'ol/interaction';
import Modify from 'ol/interaction/Modify';
import { transform } from 'ol/proj';
import { Icons } from '../../../environment'


function fromLonLat (coordinates) {
    const point = new Point(coordinates);
    point.transform('EPSG:4326', 'EPSG:900913');
    return point.getCoordinates();
    //return Array with coordinates for OL
}

// const iconStyle = new Style({
//     image: new Icon({
//             size: [50, 50],
//             offset: [50, 50],
//             color: '#8959A8',
//             crossOrigin: 'anonymous',
//             src: Icons.rest
//         })
//  });

export class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            center: fromLonLat([ 44.510308, 40.188132 ]),
            zoom: 11
        };
    
        this.map = new Map({
          target: null,
          layers: [
            new TileLayer({
              source: new OSM()
            })
          ],
          view: new View({
            center: this.state.center,
            zoom: this.state.zoom,
            maxZoom : 100,
            minZoom : 7,
          }),
        //   controls: [],
        //   interactions: [],
        });
      }


      
    componentDidMount() {
        this.map.setTarget("map");

      

        navigator.geolocation.watchPosition((pos) => {
                const coords = [pos.coords.longitude, pos.coords.latitude];
                const accuracy = circular(coords, pos.coords.accuracy);
                source.clear(true);
                source.addFeatures([
                    // new Feature(accuracy.transform('EPSG:4326', this.map.getView().getProjection())),
                    new Feature(new Point(fromLonLat(coords)))
                ]);
            },
                function(error) {
                    alert(`ERROR: ${error.message}`);
                },
                {
                    enableHighAccuracy: true
                }
          );


          const locate = document.createElement('div');
          locate.className = 'ol-control ol-unselectable locate';
          locate.innerHTML = '<button title="Locate me">◎</button>';
          locate.addEventListener('click', () => {
          if (!source.isEmpty()) {
              this.map.getView().fit(source.getExtent(), {
                maxZoom: 18,
                duration: 500,
              });
          }
          });
          this.map.addControl(new Control({
              element: locate
          }));




        //   const formattedFeatures = features.map(feature => {
        //         const point = fromLonLat(feature.geometry.coordinates);
        //         const icon = new Feature({geometry: point, featureData: feature});

        //         icon.setStyle(new Style({
        //             image: new Icon({
        //                     color: '#8959A8',
        //                     crossOrigin: 'anonymous',
        //                     src: 'rest.svg'
        //                 })
        //         }));
    
        //         return icon;
        //     });
    
       
        const source = new VectorSource();
        const layer = new VectorLayer({
            source: source
        });

        this.map.addLayer(layer);

        this.map.on('click', function(e) {
            const position = e.coordinate;
            //convert OL format to global
            const lonlat = transform(position, 'EPSG:900913', 'EPSG:4326');
            console.log(lonlat)

            const iconFeature = new Feature({
                geometry: new Point(position)
             });

            // iconFeature.setStyle(iconStyle);
            layer.getSource().clear();
            layer.getSource().addFeature(iconFeature);
        })

    
    }


   

   
    
    shouldComponentUpdate(nextProps, nextState) {
        let center = this.map.getView().getCenter();
        let zoom = this.map.getView().getZoom();
        if (center === nextState.center && zoom === nextState.zoom) return false;
        return true;
    }

    updateMap() {
        this.map.getView().setCenter(this.state.center);
        this.map.getView().setZoom(this.state.zoom);
    }
    
    render() {
        this.updateMap(); // Update map on render?
        return (
            <div id="map" style={{ width: "100%", height: "400px" }}></div>
        );
    }
}

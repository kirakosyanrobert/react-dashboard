import React, { Component } from 'react';

import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from "ol/source/OSM";
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Style, Icon} from 'ol/style';
import Control from 'ol/control/Control';
import { transform } from 'ol/proj';
import { Icons } from '../../../environment'


function fromLonLat (coordinates) {
    const point = new Point(coordinates);
    point.transform('EPSG:4326', 'EPSG:900913');
    return point.getCoordinates();
    //return Array with coordinates for OL
}

const iconStyle = new Style({
    image: new Icon({
            anchor: [0.5, 1],
            crossOrigin: 'anonymous',
            src: Icons.marker
        })
 });

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
            maxZoom : 20,
            minZoom : 7,
          }),
        });
      }


      
    componentDidMount() {
        this.map.setTarget("map");
       
      


        navigator.geolocation.watchPosition((pos) => {
                const coords = [pos.coords.longitude, pos.coords.latitude];
                const iconFeature = new Feature({
                    geometry: new Point(fromLonLat(coords))
                 });
                iconFeature.setStyle(iconStyle);

                source.clear(true);
                source.addFeatures([iconFeature]);
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
          locate.innerHTML = '<button type="button" title="Locate me">◎</button>';
          locate.addEventListener('click', () => {
          if (!source.isEmpty()) {
              this.map.getView().fit(source.getExtent(), {
                maxZoom: 20,
                duration: 500,
              });
          }
          });
          this.map.addControl(new Control({
              element: locate
          }));


        const source = new VectorSource();
        const layer = new VectorLayer({
            source: source
        });

        this.map.addLayer(layer);

       

        this.map.on('click', (e) => {
            const position = e.coordinate;
            const zoom = e.map.getView().getZoom();

            //convert OL format to global
            const lonlat = transform(position, 'EPSG:900913', 'EPSG:4326');
           

            const iconFeature = new Feature({
                geometry: new Point(position)
             });

            iconFeature.setStyle(iconStyle);
            layer.getSource().clear();
            layer.getSource().addFeature(iconFeature);

            this.props.getCoords(lonlat);
            this.setState({
                center: position,
                zoom
            });
        });

        if(this.props.center && this.props.center.lat) {
            const propsCenter = fromLonLat([this.props.center.lon, this.props.center.lat])
            
            this.map.getView().setCenter(propsCenter);
            this.map.getView().setZoom(17);

            const iconFeature = new Feature({
                geometry: new Point(propsCenter)
             });

            iconFeature.setStyle(iconStyle);
            layer.getSource().clear();
            layer.getSource().addFeature(iconFeature);
        }
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
            <div id="map" style={{ width: "100%", height: "500px" }}></div>
        );
    }
}

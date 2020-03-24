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

export class MapCard extends Component {
    constructor(props) {
        super(props);
        this.map = new Map({
          target: null,
          layers: [
            new TileLayer({
              source: new OSM()
            })
          ],
          view: new View({
            center: fromLonLat([ 44.510308, 40.188132 ]),
            zoom: 18,
            maxZoom : 18,
            minZoom : 7,
          }),
          controls: [],
          interactions: []
        });
      }


      
    componentDidMount() {
        this.map.setTarget("map-card");

        const source = new VectorSource();
        const layer = new VectorLayer({
            source: source
        });

        const position = fromLonLat([ 44.510308, 40.188132 ])
        const iconFeature = new Feature({
            geometry: new Point(position)
         });

        iconFeature.setStyle(iconStyle);
        layer.getSource().addFeature(iconFeature);

        this.map.addLayer(layer);

    }

    
    shouldComponentUpdate(nextProps) {
        if (this.props.lon === nextProps.lon && this.props.lat === nextProps.lat) return false;
        return true;
    }

    componentDidUpdate() {
        this.map.getView().setCenter(fromLonLat([this.props.lon, this.props.lat]));

        const source = new VectorSource();
        const layer = new VectorLayer({
            source: source
        });

        const position = fromLonLat([this.props.lon, this.props.lat])
        const iconFeature = new Feature({
            geometry: new Point(position)
         });

        iconFeature.setStyle(iconStyle);
        layer.getSource().addFeature(iconFeature);

        this.map.addLayer(layer);
    }

    render() {
        return (
            <div id="map-card" style={{ width: "300px", height: "300px" }}></div>
        );
    }
}

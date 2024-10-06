import { MapContainer, TileLayer, LayersControl, LayerGroup, Marker, Popup, Control } from 'react-leaflet'
import { useMap } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import L, { map } from 'leaflet';

require('leaflet/dist/leaflet.css');
require('leaflet/dist/leaflet.js');

export default function MapPage() {
    return(
        <div style={{maxHeight:'500px', maxWidth:'500px'}}>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
</div>
    )
}
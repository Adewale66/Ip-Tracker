import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import marker from "../assets/images/icon-location.svg";

const customIcon = L.icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  iconSize: [32, 45],
});

const Map = ({ position }: { position: number[] }) => {
  return (
    <MapContainer
      key={`${position[0]}-${position[1]}`}
      center={[position[0], position[1]]}
      zoom={14}
      scrollWheelZoom={false}
      className="h-[500px] z-10 relative"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[position[0], position[1]]} icon={customIcon}></Marker>
    </MapContainer>
  );
};

export default Map;

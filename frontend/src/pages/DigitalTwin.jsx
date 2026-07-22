import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useStore } from '../store';
import { Settings2, Activity, Info } from 'lucide-react';

// Fix leaflet icon issue in react
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/2.0.2/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function DigitalTwin() {
  const [recommendations, setRecommendations] = useState([]);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showVessels, setShowVessels] = useState(true);
  const activeScenario = useStore(state => state.activeScenario);

  useEffect(() => {
    fetch('http://localhost:3001/api/recommendations')
      .then(res => res.json())
      .then(data => setRecommendations(data))
      .catch(err => console.error(err));
  }, []);

  // Mock vessel positions along a route
  const vessels = [
    { id: 'V1', name: 'Oceanic Pride', lat: 24.5, lng: 56.4, heading: 'India' },
    { id: 'V2', name: 'Desert Star', lat: 26.0, lng: 55.0, heading: 'Ras Tanura' },
    { id: 'V3', name: 'Arabian Sea', lat: 23.0, lng: 60.0, heading: 'Vadinar' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl uppercase tracking-widest font-bold">Supply Chain Digital Twin</h2>
          <div className="text-sm text-gray-400 mt-1">Live Geospatial Monitoring & Simulation</div>
        </div>
        
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 text-sm uppercase tracking-wider cursor-pointer">
            <input type="checkbox" checked={showRoutes} onChange={(e) => setShowRoutes(e.target.checked)} className="form-checkbox text-accent bg-gray-800 border-gray-700" />
            <span>Shipping Lanes</span>
          </label>
          <label className="flex items-center space-x-2 text-sm uppercase tracking-wider cursor-pointer">
            <input type="checkbox" checked={showVessels} onChange={(e) => setShowVessels(e.target.checked)} className="form-checkbox text-live bg-gray-800 border-gray-700" />
            <span>Active Vessels (AIS)</span>
          </label>
        </div>
      </div>

      <div className="flex-1 border border-gray-800 relative z-0">
        <MapContainer 
          center={[20.5937, 78.9629]} 
          zoom={4} 
          scrollWheelZoom={true} 
          className="w-full h-full bg-[#0B0E11]"
          style={{ background: '#0B0E11' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {showRoutes && recommendations.map(rec => {
            if(!rec.routeId || !rec.routeId.pathCoordinates) return null;
            // leaflet takes [lat, lng], coordinates from DB might be [lng, lat] depending on how we seeded it. 
            // In our seed, we used [lng, lat] (50.0, 26.6). Let's swap it.
            const path = rec.routeId.pathCoordinates.map(coord => [coord[1], coord[0]]);
            return (
              <Polyline 
                key={rec._id} 
                positions={path} 
                color={activeScenario ? "#E8A33D" : "#3FC1C9"} 
                weight={3} 
                dashArray={activeScenario ? "5, 10" : ""}
              >
                <Popup className="bg-panel text-white">
                  <strong className="text-black">Route:</strong> {rec.routeId.origin} &rarr; {rec.routeId.destination}
                </Popup>
              </Polyline>
            );
          })}

          {showVessels && vessels.map(v => (
            <CircleMarker 
              key={v.id} 
              center={[v.lat, v.lng]} 
              radius={6} 
              color="#E8ECEF" 
              fillColor="#3FC1C9" 
              fillOpacity={0.8}
              weight={2}
            >
              <Popup>
                <div className="text-black">
                  <strong>{v.name}</strong><br/>
                  Heading: {v.heading}
                </div>
              </Popup>
            </CircleMarker>
          ))}
          
          {/* Highlight Hormuz as a risk zone */}
          <CircleMarker 
            center={[26.2, 54.5]} 
            radius={40} 
            color="#E8A33D" 
            fillColor="#E8A33D" 
            fillOpacity={0.2}
            weight={1}
            className="animate-pulse"
          >
            <Popup>
              <div className="text-black font-bold">Strait of Hormuz (High Risk)</div>
            </Popup>
          </CircleMarker>

        </MapContainer>

        {/* Floating Side Panel */}
        <div className="absolute top-4 right-4 w-80 bg-panel/90 backdrop-blur border border-gray-800 p-4 z-[1000] shadow-2xl">
           <div className="flex items-center text-sm uppercase tracking-wider text-accent mb-4 border-b border-gray-800 pb-2">
             <Info className="w-4 h-4 mr-2" /> Inspector
           </div>
           {activeScenario ? (
             <div>
               <div className="text-xs uppercase text-gray-500 mb-1">Active Scenario</div>
               <div className="font-bold text-lg text-white mb-2">{activeScenario.name}</div>
               <p className="text-sm text-gray-400">Map is displaying simulated alternative routing due to elevated risk in primary corridors.</p>
             </div>
           ) : (
             <div className="text-sm text-gray-400">
               Click any vessel or corridor on the map to inspect live AIS data, risk scores, and node capacity.
             </div>
           )}
        </div>
      </div>
    </div>
  );
}

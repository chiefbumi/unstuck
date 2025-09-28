// import { useEffect, useMemo, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Circle, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';

// // Fix missing default marker icons in Vite/Cra builds
// import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
// import marker1x from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: marker2x,
//   iconUrl: marker1x,
//   shadowUrl: markerShadow,
// });

// function ClickToSetMarker({ onPick }) {
//   useMapEvents({
//     click(e) {
//       onPick({ lat: e.latlng.lat, lng: e.latlng.lng });
//     },
//   });
//   return null;
// }

// export default function MapView({
//   initialCenter = { lat: 40.7128, lng: -74.0060 }, // NYC fallback
//   initialZoom = 13,
//   radiusKm = 5,
//   onCenterChange,
//   onReady,
// }) {
//   const [center, setCenter] = useState(initialCenter);
//   const [hasUserLocation, setHasUserLocation] = useState(false);

//   // Try to center on user location once
//   useEffect(() => {
//     if (!navigator.geolocation) return;
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
//         setCenter(loc);
//         setHasUserLocation(true);
//         onCenterChange?.(loc);
//       },
//       () => {
//         // ignore errors; remain at fallback center
//       },
//       { enableHighAccuracy: true, timeout: 8000 }
//     );
//   }, []);

//   const circleRadiusMeters = useMemo(() => radiusKm * 1000, [radiusKm]);

//   const handlePick = (latlng) => {
//     setCenter(latlng);
//     onCenterChange?.(latlng);
//   };

//   return (
//     <div style={{ height: '70vh', width: '100%' }}>
//       <MapContainer
//         center={[center.lat, center.lng]}
//         zoom={initialZoom}
//         style={{ height: '100%', width: '100%' }}
//         whenReady={(map) => onReady?.(map)}
//       >
//         {/* OpenStreetMap tiles (no key, great for MVPs) */}
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                    attribution="&copy; OpenStreetMap contributors" />

//         {/* Click anywhere to update center/marker */}
//         <ClickToSetMarker onPick={handlePick} />

//         {/* Marker at center */}
//         <Marker position={[center.lat, center.lng]} />

//         {/* Radius circle */}
//         <Circle center={[center.lat, center.lng]} radius={circleRadiusMeters} />

//       </MapContainer>

//       <div style={{ marginTop: 8, fontSize: 14 }}>
//         {hasUserLocation ? 'Centered on your location.' : 'Using fallback location (click map to set).'}
//         <br />
//         <strong>Center:</strong> {center.lat.toFixed(5)}, {center.lng.toFixed(5)} &nbsp;|&nbsp;
//         <strong>Radius:</strong> {radiusKm} km
//       </div>
//     </div>
//   );
// }

import React from 'react'

const MapView = () => {
  return (
    <div>MapView</div>
  )
}

export default MapView

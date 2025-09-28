import { useCallback, useMemo, useState } from 'react';
import { GoogleMap, Marker, Circle, useLoadScript } from '@react-google-maps/api';

const containerStyle = { height: '40vh', width: '100%' };
const fallbackCenter = { lat: 39.25552, lng: -76.71083 }; // NYC

export default function GMap({ apiKey, radiusKm = 5, onCenterChange, onClose }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey, // <-- put your key here
    // libraries: ['places'], // enable later if you need autocomplete
  });

  const [center, setCenter] = useState(fallbackCenter);
  const radiusMeters = useMemo(() => radiusKm * 1000, [radiusKm]);

  const onMapClick = useCallback((e) => {
    const c = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setCenter(c);
    onCenterChange?.(c);
    // onClose(c.lat.toFixed(radiusKm), c.lng.toFixed(radiusKm))
  }, [onCenterChange]);

  if (!isLoaded) return <div>Loading map…</div>;

  return (
    <div>
      <div className="overflow-hidden rounded-2xl">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onClick={onMapClick}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={center} />
          <Circle
            center={center}
            radius={radiusMeters}
            options={{ fillOpacity: 0.12, strokeOpacity: 0.6 }}
          />
        </GoogleMap>
      </div>

      {/* <div style={{ marginTop: 8, fontSize: 14 }}>
        <strong>Center:</strong> {center.lat.toFixed(radiusKm)}, {center.lng.toFixed(radiusKm)} &nbsp;|&nbsp;
        <strong>Radius:</strong> {radiusKm} km
      </div> */}
    </div>
  );
}

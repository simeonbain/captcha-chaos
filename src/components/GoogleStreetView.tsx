import { FunctionComponent } from "react";

interface GoogleStreetViewProps {
  apiKey: string;
  latitude: number;
  longitude: number;
}

export const GoogleStreetView: FunctionComponent<GoogleStreetViewProps> = ({ apiKey, latitude, longitude }) => {
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${latitude},${longitude}&heading=210&pitch=10&fov=35`;

  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <iframe title="Google Street View" width="100%" height="100%" frameBorder="0" style={{ border: 0 }} src={googleMapsUrl} allowFullScreen></iframe>
    </div>
  );
};

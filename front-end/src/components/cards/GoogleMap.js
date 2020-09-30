import React from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = (props) => {
    const { text } = props;
    return (
        <div>{text}</div>
    )
}

const GoogleMap = (props) => {
    const { lat, lng, locationName } = props;
    const coordinates = {
        center: {
            lat: lat,
            lng: lng
        },
        zoom: 11
    }

    // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}

    return (
        <div style={{ height: '300px', width: '100%', marginLeft: 16, marginRight: 16}}>
            <GoogleMapReact
                defaultCenter={coordinates.center}
                defaultZoom={coordinates.zoom}
            >
                <Marker
                    lat={lat}
                    lng={lng}
                    text={locationName}
                />
            </GoogleMapReact>
        </div>
    )

}

export default GoogleMap;
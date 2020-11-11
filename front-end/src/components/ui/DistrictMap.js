import React from 'react'
import ReactMapboxGl, { Layer, Source } from "react-mapbox-gl"

/**
 * MapBox component and necessary source info
 */
const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAP_KEY,
})

const HOUSE_SOURCE = {
    type: "vector",
    url: "mapbox://catalystic.4792yhty",
}

const SENATE_SOURCE = {
    type: "vector",
    url: "mapbox://catalystic.32xmvx8x",
}

const CONGRESS_SOURCE = {
    type: "vector",
    url: "mapbox://catalystic.1h2pkbbe",
}

/**
 * Functional component for District map
 * @param {District} props 
 */
const DistrictMap = (props) => {
    const {
        max_lat,
        max_long,
        min_lat,
        min_long,
        type,
        number,
        containerStyle
    } = props
    return (
        <Map
            // eslint-disable-next-line
            style="mapbox://styles/mapbox/streets-v11"
            fitBounds={[
                [max_lat, max_long],
                [min_lat, min_long],
            ]}
            fitBoundsOptions={{ padding: 80 }}
            movingMethod="easeTo"
            containerStyle={ containerStyle }
            maxZoom={[4.5]}
        >
            {/* MapBox for district boundaries */}
            {type === "tx_house" ? (
                <div>
                    <Source
                        id="house_source"
                        tileJsonSource={HOUSE_SOURCE}
                    />
                    <Layer
                        id="house_layer"
                        type="line"
                        sourceId="house_source"
                        sourceLayer="texas_house_shapefile-57mz0c"
                        filter={["in", "District", number]}
                    />
                    <Layer
                        id="house_layer_fill"
                        type="fill"
                        sourceId="house_source"
                        sourceLayer="texas_house_shapefile-57mz0c"
                        paint={{
                            "fill-color": "#6e599f",
                            "fill-opacity": 0.5,
                        }}
                        filter={["in", "District", number]}
                    />
                </div>
            ) : type === "tx_senate" ? (
                <div>
                    <Source
                        id="senate_source"
                        tileJsonSource={SENATE_SOURCE}
                    />
                    <Layer
                        id="senate_layer"
                        type="line"
                        sourceId="senate_source"
                        sourceLayer="texas_senate_shapefile-5reubk"
                        filter={["in", "District", number]}
                    />
                    <Layer
                        id="senate_layer_fill"
                        type="fill"
                        sourceId="senate_source"
                        sourceLayer="texas_senate_shapefile-5reubk"
                        paint={{
                            "fill-color": "#6e599f",
                            "fill-opacity": 0.5,
                        }}
                        filter={["in", "District", number]}
                    />
                </div>
            ) : type === "us_house" ? (
                <div>
                    <Source
                        id="congress_source"
                        tileJsonSource={CONGRESS_SOURCE}
                    />
                    <Layer
                        id="congress_layer"
                        type="line"
                        sourceId="congress_source"
                        sourceLayer="texas_congress_shapefile-27vyoe"
                        filter={["in", "District", number]}
                    />
                    <Layer
                        id="congress_layer_fill"
                        type="fill"
                        sourceId="congress_source"
                        sourceLayer="texas_congress_shapefile-27vyoe"
                        paint={{
                            "fill-color": "#6e599f",
                            "fill-opacity": 0.5,
                        }}
                        filter={["in", "District", number]}
                    />
                </div>
            ) : null}
        </Map>
    )
}

export default DistrictMap

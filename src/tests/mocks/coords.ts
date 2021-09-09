export const GET_COORDS_QUERY = `
query ($address: String!) {
    coords: GetCoordsByAddress(address: $address) {
        lat, lon
    }
}
`;

export const GET_QUERY_VARIABLES_1 = 'Loulé, Areeiro, Portugal';
export const GET_QUERY_VARIABLES_2 = 'Seattle, WA';

export const GET_COORDS_RESULT_1 = {
    'lat': 37.1077389,
    'lon': -8.0238222
};

export const GET_COORDS_RESULT_2 = {
    'lat': 47.6038,
    'lon': -122.3301
};

/**
 * A response generated from Mapbox API.
 * Simulates a successful response.
 */
export const MAPBOX_RESULT_1 = `
{
    "type": "FeatureCollection",
    "query": [
      "areeiro",
      "loulé",
      "portugal"
    ],
    "features": [
      {
        "id": "address.1877549845185804",
        "type": "Feature",
        "place_type": [
          "address"
        ],
        "relevance": 1,
        "properties": {
          "accuracy": "street"
        },
        "text": "Túnel Do Areeiro",
        "place_name": "Túnel Do Areeiro, 8100-225 Loulé, Faro, Portugal",
        "matching_text": "Areeiro",
        "matching_place_name": "Areeiro, 8100-225 Loulé, Faro, Portugal",
        "center": [
          -8.0238222,
          37.1077389
        ],
        "geometry": {
          "type": "Point",
          "coordinates": [
            -8.0238222,
            37.1077389
          ]
        },
        "context": [
          {
            "id": "postcode.11264852958822280",
            "text": "8100-225"
          },
          {
            "id": "place.13215244631179930",
            "wikidata": "Q586722",
            "text": "Loulé"
          },
          {
            "id": "region.5299297742456210",
            "wikidata": "Q244521",
            "short_code": "PT-08",
            "text": "Faro"
          },
          {
            "id": "country.8463333744527380",
            "wikidata": "Q45",
            "short_code": "pt",
            "text": "Portugal"
          }
        ]
      }
    ]
}
`;

/**
 * Another response generated from Mapbox API.
 * Simulates a successful response.
 */
export const MAPBOX_RESULT_2 = `
{
    "type": "FeatureCollection",
    "query": [
      "seattle",
      "wa"
    ],
    "features": [
      {
        "id": "place.6907264716229470",
        "type": "Feature",
        "place_type": [
          "place"
        ],
        "relevance": 1,
        "properties": {
          "wikidata": "Q5083"
        },
        "text": "Seattle",
        "place_name": "Seattle, Washington, United States",
        "bbox": [
          -122.435900266,
          47.350685958,
          -122.218864003,
          47.778803038
        ],
        "center": [
          -122.3301,
          47.6038
        ],
        "geometry": {
          "type": "Point",
          "coordinates": [
            -122.3301,
            47.6038
          ]
        },
        "context": [
          {
            "id": "district.9122689011421610",
            "wikidata": "Q108861",
            "text": "King County"
          },
          {
            "id": "region.9713796497246050",
            "wikidata": "Q1223",
            "short_code": "US-WA",
            "text": "Washington"
          },
          {
            "id": "country.19678805456372290",
            "wikidata": "Q30",
            "short_code": "us",
            "text": "United States"
          }
        ]
      }
    ]
}
`;

/**
 * Simulates a Mapbox response without a list of responses
 */
export const MAPBOX_RESULT_3 = `
{
    "type": "FeatureCollection",
    "query": [
      "areeiro",
      "loulé",
      "portugal"
    ],
    "features": []
}
`;
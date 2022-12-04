require([
    //ArcGIS JS API
    "esri/config",
    "esri/Map",
    "esri/layers/FeatureLayer",
    "esri/views/MapView",
    "esri/symbols/WebStyleSymbol",
    "esri/smartMapping/renderers/location",

    //Widgets
    "esri/widgets/Home",
    "esri/widgets/Search",

    //Bootstrap
    "bootstrap/Collapse",
    "bootstrap/Dropdown",

    //Calcite Maps
    "calcite-maps/calcitemaps-v0.10",
    
    //Calcite Maps ArcGIS Support
    "calcite-maps/calcitemaps-arcgis-support-v0.10",

    //Dojo
    "dojo/domReady!"

], function(esriConfig, Map, FeatureLayer, MapView, WebStyleSymbol, LocationRendererCreator, Home, Search, Collapse, Dropdown, CalciteMaps, CalciteMapArcGISSupport){

//esri agol api key
esriConfig.apiKey = "AAPK81762376d6974634a978fa72c12fdfbdqcwchnbMurlNeJgk4ov0WxRZLEi9rayVxvBJeTGwyKw9Vy2_Azi6YAtY1QAlpkkm";

const eventLayer = new FeatureLayer({
    id: "weather_events",
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/SITREP_DATA/FeatureServer/0"
});

let eventSymbol = {
    type: "simple-marker",
    color: "red",
    size: 4
};

eventLayer.renderer = {
    type: "simple",
    symbol: eventSymbol
};

const facilityLayer = new FeatureLayer({
    id: "facilities",
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/SITREP_DATA/FeatureServer/1"
});

let facilitySymbol = {
    type: "simple-marker",
    color: "green",
    size: 5
};

facilityLayer.renderer = {
    type: "simple",
    symbol: facilitySymbol
};

//construct a new web map using basic topographic basemap
//add weather event and facility layers by default
const map = new Map({
    basemap: "topo-vector",
    layers: [eventLayer, facilityLayer]
});

//construct new map view
const view = new MapView({
    //placed in viewDiv html
    container: "viewDiv",
    //use the web map as the map for the view
    map: map,
    zoom: 4.5,
    center: [-100, 41] 
});

//on start-up, populate weather events dropdown
$(document).ready(() => {
    $("#weather-default").after(
        '<calcite-option>Test Event</calcite-option>'
    );
});

});
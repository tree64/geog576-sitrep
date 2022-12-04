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
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/SITREP_DATA/FeatureServer/1",
    minScale: 250000
});

let eventSymbol = {
    type: "simple-point",
    color: "red",
    size: 4
};

eventLayer.renderer = {
    type: "simple",
    symbol: eventSymbol
};

const map = new Map({
    basemap: "topo-vector",
    layers: [eventLayer]
});

const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 4.5,
    center: [-100, 41] 
});

});
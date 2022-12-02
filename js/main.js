require([
    //ArcGIS JS API
    "esri/config",
    "esri/WebScene",
    "esri/layers/GeoJSONLayer",
    "esri/views/SceneView",
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

], function(esriConfig, WebScene, GeoJSONLayer, SceneView, WebStyleSymbol, LocationRendererCreator, Home, Search, Collapse, Dropdown, CalciteMaps, CalciteMapArcGISSupport){

//esri agol api key
esriConfig.apiKey = "AAPK81762376d6974634a978fa72c12fdfbdqcwchnbMurlNeJgk4ov0WxRZLEi9rayVxvBJeTGwyKw9Vy2_Azi6YAtY1QAlpkkm";

});
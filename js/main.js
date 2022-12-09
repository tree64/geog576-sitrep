require([
    //ArcGIS JS API
    "esri/config",
    "esri/Map",
    "esri/layers/FeatureLayer",
    "esri/views/MapView",
    "esri/views/draw/Draw",
    "esri/Graphic",
    "esri/geometry/geometryEngine",
    //"esri/symbols/WebStyleSymbol",
    //"esri/smartMapping/renderers/location",

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

], function(esriConfig, Map, FeatureLayer, MapView, Draw, Graphic, geometryEngine, Home, Search, Collapse, Dropdown, CalciteMaps, CalciteMapArcGISSupport){

    //esri agol api key
    esriConfig.apiKey = "AAPK81762376d6974634a978fa72c12fdfbdqcwchnbMurlNeJgk4ov0WxRZLEi9rayVxvBJeTGwyKw9Vy2_Azi6YAtY1QAlpkkm";

    //weather events layer
    const eventLayer = new FeatureLayer({
        id: "weather_events",
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/SITREP_DATA/FeatureServer/0"
    });

    //symbol style for events layer
    let eventSymbol = {
        type: "simple-marker",
        color: "red",
        size: 4
    };

    //apply eventSymbol style to eventLayer
    eventLayer.renderer = {
        type: "simple",
        symbol: eventSymbol
    };

    //static facilities layer
    const facilityLayer = new FeatureLayer({
        id: "facilities",
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/SITREP_DATA/FeatureServer/1"
    });

    //symbol style for facility layer
    let facilitySymbol = {
        type: "simple-marker",
        color: "green",
        size: 5
    };

    //apply facilitySymbol style to facilityLayer
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

    //add the button for the point tool
    view.ui.add("polygon-button", "top-left");

    // create a new instance of draw
    let draw = new Draw({
        view: view
    });

    //draw polyline button
    $("#polygon-button").on("click", () => {
        enableCreatePolygon(draw, view)
    });

    function enableCreatePolygon(draw, view) {

        const action = draw.create("polygon");

        action.on("vertex-add", (e) => {
        createPolygonGraphic(e.vertices)
        });

        action.on("vertex-remove", (e) => {
            createPolygonGraphic(e.vertices)
        });

        action.on("cursor-update", (e) => {
            createPolygonGraphic(e.vertices)
        });

        action.on("draw-complete", (e) => {
            createPolygonGraphic(e.vertices)
        });
    };

    function createPolygonGraphic(vertices) {
        view.graphics.removeAll();
        let polygon = {
            type: "polygon",
            rings: vertices,
            spatialReference: view.spatialReference
        };

        let graphic = new Graphic({
            geometry: polygon,
            symbol: {
                type: "simple-line",
                color: "red",
                width: 1.5
            }
        });

        view.graphics.add(graphic);
    }

    //on start-up, populate weather events dropdown
    $(document).ready(() => {
        populateDropdown("event");
        tabContentResize();
    });

    $(window).resize(function() {
        tabContentResize();
    });

    function tabContentResize() {
        let tabsHeight = $(".nav.nav-tabs").css("height");
        let height = "calc(100vh - 50px - " + tabsHeight + ")"
        $("#tabContent").css("height", height);
        $(".tab-pane").css("height", height);
    }

    $('#tool-tabs a').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

    $("#weather-dropdown").on(
        "calciteSelectChange",
        populateDropdown("iwa")
    );

    function populateDropdown(dropdown, event) {
        //determine which dropdown to populate
        if (dropdown == "event") {
            //clear weather dropdown options except for the default
            $("#weather-container option:not(:first)").remove();

            //append each of the existing weather events as a new option
            $("#weather-default").after(
                '<calcite-option>Test Event</calcite-option>'
            );
        } else if (dropdown == "iwa") {
            //clear iwa dropdown options except for the default
            $("#iwa-container option:not(:first)").remove();

            //append each of the existing iwa's for the selected weather event
            $("#iwa-default").after(
                '<calcite-option>Test IWA</calcite-option>'
            )
        };
    }
});
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
    view.ui.add("point-button", "top-left");
    view.ui.add("polygon-button", "top-left");

    // create a new instance of draw
    let draw = new Draw({
        view: view
    });

    //insert point button
    $("#point-button").on("click", () => {
        enableInsertPoint(draw, view);
    })

    // Cancel drawing when user presses "ESC" key.
    $(document).keydown((k) => {
        if (k.keyCode == 27) {
            draw.reset();
            view.graphics.removeAll();
        }
    });

    function enableInsertPoint(draw, view) {
        const action = draw.create("point");

        // PointDrawAction.cursor-update
        // Give a visual feedback to users as they move the pointer over the view
        action.on("cursor-update", (e) => {
            followPointGraphic(e.coordinates);
        });

        // PointDrawAction.draw-complete
        // Create a point when user clicks on the view or presses "C" key.
        action.on("draw-complete", (e) => {
            createPointGraphic(e.coordinates);
        });
    }

    function followPointGraphic(coordinates){
        view.graphics.removeAll();
        let point = {
            type: "point", // autocasts as /Point
            x: coordinates[0],
            y: coordinates[1],
            spatialReference: view.spatialReference
        };

        let graphic = new Graphic({
            geometry: point,
            symbol: {
                type: "picture-marker", // autocasts as SimpleMarkerSymbol
                url: "img/dmg_marker.png",
                width: "20px",
                height: "20px"
            }
        });
        view.graphics.add(graphic);
    }

    function createPointGraphic(coordinates){
        view.graphics.removeAll();
        let point = {
            type: "point", // autocasts as /Point
            x: coordinates[0],
            y: coordinates[1],
            spatialReference: view.spatialReference
        };

        let graphic = new Graphic({
            geometry: point,
            symbol: {
                type: "picture-marker", // autocasts as SimpleMarkerSymbol
                url: "img/dmg_marker.png",
                width: "20px",
                height: "20px"
            }
        });
        view.graphics.add(graphic);
        console.log(graphic.geometry.latitude, graphic.geometry.longitude)
    }

    //draw polygon button
    $("#polygon-button").on("click", () => {
        enableCreatePolygon(draw, view)
    });

    function enableCreatePolygon(draw, view) {

        const action = draw.create("polygon");

        action.on("vertex-add", (e) => {
            drawPolygonGraphic(e.vertices)
        });

        action.on("vertex-remove", (e) => {
            drawPolygonGraphic(e.vertices)
        });

        action.on("cursor-update", (e) => {
            drawPolygonGraphic(e.vertices)
        });

        action.on("draw-complete", (e) => {
            completePolygonGraphic(e.vertices)
        });
    };

    function drawPolygonGraphic(vertices) {
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

    function completePolygonGraphic(vertices) {
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
        console.log(graphic);
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
        //get height of tab panels
        let tabsHeight = $("#tool-tabs").css("height");
        //calculate height of tab panels and content
        let heightContent = "calc(100vh - 50px - " + tabsHeight + ")"
        let heightPane = "calc(100vh - 60px - " + tabsHeight + ")"
        //set heights of tab panels and content
        $("#tabContent").css("height", heightContent);
        $(".tab-pane").css("height", heightPane);
    }

    $('#tool-tabs a').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
    });

    $("#weather-dropdown").on("calciteSelectChange", (e) => {
            populateDropdown("iwa");
            eventSelected(e.target.value);
        }
    );

    function populateDropdown(dropdown, event) {
        //determine which dropdown to populate
        if (dropdown == "event") {
            //clear weather dropdown options except for the default
            $("#weather-container option:not(:first)").remove();

            //append each of the existing weather events as a new option
            $("#weather-default").after(
                '<calcite-option>New Event</calcite-option>' +
                '<calcite-option>Test Event</calcite-option>'
            );
        } else if (dropdown == "iwa") {
            //clear iwa dropdown options except for the default
            $("#iwa-container option:not(:first)").remove();

            //append each of the existing iwa's for the selected weather event
            $("#iwa-default").after(
                '<calcite-option>New IWA</calcite-option>'
            )
        };
    }

    function eventSelected(selection) {
        if (selection == "New Event") {
            $("#weather-form").css("display", "block");
            clearForms();
        }
        else if (selection == "Select Weather Event") {
            $("#weather-form").css("display", "none");
            $("#iwa-form").css("display", "none");
            clearForms();
        }
        else {
            $("#iwa-tab").tab("show");
            $("#iwa-form").css("display", "block")
            $("#iwa").prepend(
                "<p id='event-label'>Weather Event: " + selection + "</p>"
            );
        };
    }

    function clearForms() {
        $("#weather-form").closest('form').find("input[type=text], textarea").val("");
        $("#weather-form").closest('form').find("input[type=date], textarea").val("");
        $("#disaster-type").val("");
        $("#iwa-form").closest('form').find("input[type=text], textarea").val("");
        $("#iwa-form").closest('form').find("input[type=date], textarea").val("");
        $("p").remove("#event-label");

    }
});
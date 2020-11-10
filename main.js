$(function(){
    // To add new datasets:
    // 1. Add the necessary folders in the repository
    // 2. Add the proper entries below

    var datasets = [
        {
            id: 'aukerman',
            label: "Aukerman",
            center: new L.LatLng(41.30442, -81.75232)
        },
        {
            id: 'brighton_beach',
            label: "Brighton Beach",
            center: new L.LatLng(46.84261, -91.99402)
        },
        {
            id: 'sand_key',
            label: "Sand Key",
            center: new L.LatLng(27.95864, -82.83185)
        },
    ];

    var engines = [
        {
            id: "odm-0.9.9",
            label: "ODM 0.9.9",
        },
        {
            id: "odm-2.1.1",
            label: "ODM 2.1.1",
            rightStart: true
        },
        {
            id: "dronedeploy-2.59.0",
            label: "Drone Deploy 2.59.0",
            leftStart: true
        },
        {
            id: "metashape-1.5.2",
            label: "Metashape 1.5.2"
        },
        {
            id: "dronemapper-1.9",
            label: "DroneMapper 1.9"
        },
        {
            id: "nodemicmac-0.0.1",
            label: "NodeMICMAC 0.0.1"
        },
        {
            id: "pix4d-4.4.10",
            label: "Pix4D 4.4.10"
        },
    ]

    var map = L.map('map', {
        zoom: 20,
        center: datasets[0].center
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 99,
        maxNativeZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    // Populate datasets
    var $dataset = $("#dataset");
    $dataset.on('change', function(e){
        updateLayers();
        centerOnLayer();
    });
    
    for (var i in datasets){
        var d = datasets[i];
        var $opt = $('<option value="' + d.id + '">' + d.label + '</option>');
        
        $dataset.append($opt);
    }

    // Populate engines
    var $leftEngine = $("#leftEngine");
    $leftEngine.on('change', function(e){
        if ($(this).val() !== $rightEngine.val()){
            updateLayers();
        }else{
            var engId = null;
            for (var k in engines){
                if (engines[k].id !== $rightEngine.val()){
                    engId = engines[k].id;
                    break;
                }
            }
            $(this).val(engId);
            updateLayers();
        }
    });
    var $rightEngine = $("#rightEngine");
    $rightEngine.on('change', function(e){
        if ($(this).val() !== $leftEngine.val()){
            updateLayers();
        }else{
            var engId = null;
            for (var k in engines){
                if (engines[k].id !== $leftEngine.val()){
                    engId = engines[k].id;
                    break;
                }
            }
            $(this).val(engId);
            updateLayers();
        }
    });
    
    for (var i in engines){
        var e = engines[i];
        var $opt = $('<option value="' + e.id + '"' + (e.rightStart ? 'selected' : '') + '>' + e.label + '</option>');
        $rightEngine.append($opt);
        
        $opt = $('<option value="' + e.id + '"' + (e.leftStart ? 'selected' : '') + '>' + e.label + '</option>');
        $leftEngine.append($opt);
    }

    var $product = $("#product");
    $product.on("change", function(){
        updateLayers();
    });

    // Create layers
    var layers = {};
    $leftEngine.children().each(function(){
        var engineId = $(this).val();
        $dataset.children().each(function(){
            var datasetId = $(this).val();

            $product.children().each(function(){
                var productId = $(this).val();

                var prefix = "/";
                if (window.location.href.toLowerCase().indexOf("opendronemap.github.io") !== -1){
                    prefix = "/UAVArena/";
                }

                layers[engineId + '|' + datasetId + '|' + productId] = L.tileLayer(prefix + 'data/' + engineId +'/' + datasetId + '/' + productId + '/tiles/{z}/{x}/{y}.png', {
                    noWrap: true,
                    maxZoom: 99,
                    maxNativeZoom: 21,
                    tms: true
                });
            });
        });
    });

    var sideBySide = L.control.sideBySide([], []).addTo(map);

    var updateLayers = function(){
        for (var k in layers){
            map.removeLayer(layers[k]);
        }
        
        var leftLayer = layers[$leftEngine.val() + '|' + $dataset.val() + '|' + $product.val()];
        var rightLayer = layers[$rightEngine.val() + '|' + $dataset.val() + '|' + $product.val()];
        
        if (leftLayer){
            leftLayer.addTo(map);
            sideBySide.setLeftLayers([leftLayer]);
        }else{
            sideBySide.setLeftLayers([]);
        }

        if (rightLayer){
            rightLayer.addTo(map);
            sideBySide.setRightLayers([rightLayer]);
        }else{
            sideBySide.setRightLayers([]);
        }
    };

    var centerOnLayer = function(){
        for (var k in datasets){
            if (datasets[k].id === $dataset.val()){
                map.panTo(datasets[k].center);
                break;
            }
        }
    };

    updateLayers();
    centerOnLayer();

});
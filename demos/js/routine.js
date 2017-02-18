function initThree (domParent, outw, outh, writeMsg) {
    if (!Detector.webgl) {
        if (writeMsg || writeMsg === undefined) {
            var msg = Detector.getWebGLErrorMessage();
            domParent.appendChild(msg);
        }
        return undefined;
    }

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, outw / outh, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(outw, outh);
    renderer.setClearColor(0x000000, 1);
    domParent.appendChild(renderer.domElement);

    var controls = undefined;
    if (THREE.TrackballControls !== undefined) {
        controls = new THREE.TrackballControls(camera, renderer.domElement);
    }

    return {
        scene: scene,
        camera: camera,
        renderer: renderer,
        controls: controls
    };
}

function drawCoords (scene) {
    var xmat = new THREE.LineBasicMaterial({color: 0xff0000});
    var ymat = new THREE.LineBasicMaterial({color: 0x00ff00});
    var zmat = new THREE.LineBasicMaterial({color: 0x0000ff});

    var xgeo = new THREE.Geometry();
    xgeo.vertices.push(
        new THREE.Vector3(-5, 0, 0),
        new THREE.Vector3(5, 0, 0),
        new THREE.Vector3(4.8, 0.2, 0)
    );
    var ygeo = new THREE.Geometry();
    ygeo.vertices.push(
        new THREE.Vector3(0, -5, 0),
        new THREE.Vector3(0, 5, 0),
        new THREE.Vector3(0.2, 4.8, 0)
    );
    var zgeo = new THREE.Geometry();
    zgeo.vertices.push(
        new THREE.Vector3(0, 0, -5),
        new THREE.Vector3(0, 0, 5),
        new THREE.Vector3(0, 0.2, 4.8)
    );

    var xline = new THREE.Line(xgeo, xmat);
    var yline = new THREE.Line(ygeo, ymat);
    var zline = new THREE.Line(zgeo, zmat);

    scene.add(xline);
    scene.add(yline);
    scene.add(zline);

    return {x: xline, y: yline, z: zline};
}

function loadModel(path, skinned, cb) {
    var loader = new THREE.JSONLoader();
    loader.load(path, function (geometry, materials) {
        var model;

        if (skinned) {
            for ( var i = 0; i < materials.length; i ++ ) {
                var m = materials[ i ];
                m.skinning = true;
            }

            model = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
        } else {
            model = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        }

        cb(model);
    });
}

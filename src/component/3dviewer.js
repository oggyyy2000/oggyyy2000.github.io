import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

var camera, scene, renderer, controls;

export default function Visualization(props) {
  const refContainer = useRef();
  useEffect(() => {
    const { current: container } = refContainer;
    const path_3d_obj = props?.data?.obj3d;
    const extension = path_3d_obj.split(".").pop();
    if (path_3d_obj !== "") {
      var canvas_3d = document.querySelector(
        'canvas[data-engine="three.js r139"]'
      );
      if (canvas_3d) canvas_3d.remove();
      init();
      animate();
    }

    function init() {
      //initializing the camera
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.01,
        2000
      );
      camera.position.z = 2;
      camera.position.set(0, 9, 1500);

      //initializing the scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color("#dedef0");
      //scene.add(new THREE.AxesHelper(30));

      // Lights

      scene.add(new THREE.HemisphereLight(0x443333, 0x111122));

      //initializing renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;

      //adding renderer to DOM
      container.appendChild(renderer.domElement);

      //initializing interactive controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.update();

      var p_material = new THREE.MeshBasicMaterial({ color: "#1877f2" });
      if (extension === "obj") {
        //rendering obj file
        const objLoader = new OBJLoader();

        objLoader.load(
          path_3d_obj,
          function (object) {
            object.traverse(function (child) {
              if (child instanceof THREE.Mesh) {
                child.material = p_material;
              }
            });

            object.position.x = 200;
            object.position.y = 0;
            object.position.z = 0;

            scene.add(object);
          },
          function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          function (error) {
            console.log("An error happened");
            console.log(error);
          }
        );
      } else {
        const loader = new GLTFLoader();
        loader.load(
          path_3d_obj,
          (gltf) => {
            const obj = gltf.scene;
            obj.name = props?.data?.name;
            obj.position.y = 0;
            obj.position.x = 0;
            obj.receiveShadow = false;
            obj.castShadow = false;
            scene.add(obj);

            obj.traverse(function (child) {
              if (child.isMesh) {
                child.castShadow = false;
                child.receiveShadow = false;
              }
            });
          },
          function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          function (error) {
            console.log(error);
          }
        );
      }

      // resize

      window.addEventListener("resize", onWindowResize, false);
    }

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  });
  return <div ref={refContainer}></div>;
}

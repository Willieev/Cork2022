import {loadGLTF, loadVideo} from "../../Cork2022/Cork/libs/loader.js";
//import {mockWithVideo} from '../../libs/camera-mock.js';
import {createChromaMaterial} from '../../Cork2022/Cork/libs/chroma-video.js';

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    //mockWithVideo('../../Cork/assets/mock-videos/course-banner1.mp4');
    
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../Cork2022/Cork/assets/targets/CorkMInd.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    const video = await loadVideo("../../Cork2022/Cork/assets/videos/CorkVideo.mp4");
    video.play();
    video.pause();
    const texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(1, 1080/1920);
    const material = new THREE.MeshBasicMaterial({map: texture});
    //const material = createChromaMaterial(texture, 0x00ff00);
    const plane = new THREE.Mesh(geometry, material);
    //plane.rotation.x = Math.PI/2;
    //plane.position.y = 0.7;
    plane.scale.multiplyScalar(1);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    anchor.onTargetFound = () => {
      video.play();
    }
    anchor.onTargetLost = () => {
      video.pause();
    }

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }

  const startButton = document.createElement("button");
  startButton.textContent = "Tap To Scan";
  startButton.addEventListener("click", start);

  startButton.addEventListener("click", function() {
		startButton.hidden = true;
	});

  document.body.appendChild(startButton);

  startButton.style.position = "absolute";
  startButton.style.left = "50%";
  startButton.style.transform = "translateX(-50%)";
  //startButton.style.transform = "translateY(100%)";
  //startButton.style.transform = "translateY(80%)";

  startButton.style.width = '200px'; // setting the width to 200px
  startButton.style.height = '200px'; // setting the height to 200px
  startButton.style.background = 'black'; // setting the background color to black
  startButton.style.color = 'white'; // setting the color to white
  startButton.style.fontSize = '20px'; // setting the font size to 20px


  //start();
  //
});
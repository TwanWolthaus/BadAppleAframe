
var standardRadius = "1";
var images = [];
var subCam;

window.addEventListener("load", badAppleInit)

function badAppleInit() {

    let boxField = document.getElementById("js--boxField");
    let platform = document.getElementsByClassName("js--telePlatform")[0];
    subCam = document.getElementById("js--subCam");

    platform.addEventListener('click', teleport);
    
    buildScreen(boxField);

    let images = getCSV('./images.csv');
}

function buildScreen(parent) {

    let x = 1
    let y = 30
    let z = 0

    for (let i = 0; i < 1230; i++) {

        generateBox(parent, 2*(x - 21), 2*(y - 15), z);

        x += 1;
        if (x > 41) {
            x = 1;
            y -= 1;
        }
    }
}

function generateBox(parent, x, y, z) {

    var box = document.createElement('a-box');

    box.setAttribute('position', x + " " + y + " " + z);
    box.setAttribute('geometry', 'width: 1.3; height: 1.3; depth: 1.3');
    box.setAttribute('color', "#FFFFFF");
    box.setAttribute('material', "shader", 'standard');

    parent.appendChild(box);
};


const teleport = (event) => {

    let camera = document.getElementById("js--camera");
    let platform = event.target;

    let cameraY = camera.getAttribute('position').y;
    let platformX = platform.getAttribute("position").x;
    let platformZ = platform.getAttribute("position").z;

    let newPos = platformX + " " + cameraY + " " + platformZ;
    let animationAttribte = document.createAttribute("animation");

    animationAttribte.value = "property: position; easing: linear; dur: 500; to: " + newPos;
    camera.setAttribute('animation', animationAttribte.value);

    activateAnimation();
}


function activateAnimation() {

    let screen = document.getElementById("js--boxField");
    let boxes = screen.children;

    let constantDelay = 1000;
    let stretch = 1;
    
    subCam.setAttribute('material', 'opacity', '0');

    startMusic(constantDelay);

    for (let i = 0; i < 6562; i += 2) {

        setTimeout(() => {

            for (let s = 0; s < 1230; s++) {
                
                dimension = images[Math.round(i)][s];
                rotation = 90 - 90 * dimension;
                dimension *= 1.3;
                boxes[s].setAttribute('rotation', `${rotation}, 0, 0`);
                boxes[s].setAttribute('geometry', `width: ${dimension}; height: ${dimension}; depth: ${dimension}`);

            }

        }, constantDelay + i * stretch * (1000 / 30));
    }
}

function startMusic(delay) {

    let music = new Audio('./badApple.mp3');

    setTimeout(() => {
        music.play();
    }, delay - 100);
}


function saveCSVFile(fileContent) {

    const lines = fileContent.split('\n');

    for (let i = 0; i < 6562; i++) {
        images.push(lines[i].split(','));
    }
}
  
function getCSV(path) {

    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })

        .then(data => {
            saveCSVFile(data);
        })

        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
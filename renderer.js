// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const objectivesDeck = [];
const powerDeck = [];
let objectiveDiscardCount = 0;
let powerDiscardCount = 0;

const updateObjectivesDeckSize = () =>
  (document.getElementById(
    "objectives-deck-size"
  ).innerText = `${objectivesDeck.length}`);
const updatePowerDeckSize = () =>
  (document.getElementById(
    "power-deck-size"
  ).innerText = `${powerDeck.length}`);

const updateObjectiveDiscardCount = () => {
  document.getElementById(
    "objective-discard-count"
  ).innerText = `${objectiveDiscardCount}`;
};
const updatePowerDiscardCount = () => {
  document.getElementById(
    "power-discard-count"
  ).innerText = `${powerDiscardCount}`;
};

const objectivesLocationInput = document.getElementById(
  "objectives-deck-location"
);
objectivesLocationInput.addEventListener(
  "change",
  () => {
    const files = Object.values(objectivesLocationInput.files);
    files.forEach((file) => {
      if (
        file.name.toLowerCase().endsWith("png") ||
        file.name.toLowerCase().endsWith("jpg")
      ) {
        objectivesDeck.push(file.path);
      }
    });
    updateObjectivesDeckSize();
    objectivesLocationInput.remove();
  },
  false
);

const powerLocationInput = document.getElementById("power-deck-location");
powerLocationInput.addEventListener(
  "change",
  () => {
    const files = Object.values(powerLocationInput.files);
    files.forEach((file) => {
      if (
        file.name.toLowerCase().endsWith("png") ||
        file.name.toLowerCase().endsWith("jpg")
      ) {
        powerDeck.push(file.path);
      }
    });
    updatePowerDeckSize();
    powerLocationInput.remove();
  },
  false
);

const drawObjective = (objectiveImage) => {
  objectiveImage.onclick = () => {
    document.getElementById("objectives-hand").removeChild(objectiveImage);
    document.getElementById("objectives-discard").appendChild(objectiveImage);
    objectiveDiscardCount++;
    updateObjectiveDiscardCount();
    objectiveImage.onclick = () => {
      drawObjective(objectiveImage);
      objectiveDiscardCount--;
      updateObjectiveDiscardCount();
    };
  };
  document.getElementById("objectives-hand").appendChild(objectiveImage);
  updateObjectivesDeckSize();
};

const drawPower = (powerImage) => {
  powerImage.onclick = () => {
    document.getElementById("power-hand").removeChild(powerImage);
    document.getElementById("power-discard").appendChild(powerImage);
    powerDiscardCount++;
    updatePowerDiscardCount();
    powerImage.onclick = () => {
      drawPower(powerImage);
      powerDiscardCount--;
      updatePowerDiscardCount();
    };
  };
  document.getElementById("power-hand").appendChild(powerImage);
  updatePowerDeckSize();
};

const drawObjectiveButton = document.getElementById("draw-objective-button");
drawObjectiveButton.addEventListener(
  "click",
  () => {
    if (objectivesDeck.length > 0) {
      const objective = objectivesDeck.splice(
        Math.floor(Math.random() * objectivesDeck.length),
        1
      )[0];
      const objectiveImage = document.createElement("img");
      objectiveImage.src = objective;
      objectiveImage.height = 180;
      objectiveImage.className = "card";
      drawObjective(objectiveImage);
    }
  },
  false
);

const drawPowerButton = document.getElementById("draw-power-button");
drawPowerButton.addEventListener(
  "click",
  () => {
    if (powerDeck.length > 0) {
      const powerCard = powerDeck.splice(
        Math.floor(Math.random() * powerDeck.length),
        1
      )[0];
      const powerImage = document.createElement("img");
      powerImage.src = powerCard;
      powerImage.height = 180;
      powerImage.className = "card";
      drawPower(powerImage);
    }
  },
  false
);

  const videoElement = document.querySelector("#input-video");
  const canvasElement = document.querySelector("#output-video");
  const canvasCtx = canvasElement.getContext("2d");

  function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        let positionX = landmarks[10].x;
        let positionY = landmarks[10].y;
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 1,
        });
        drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 1 });
        if (typeof mouse != "undefined") {
            mouse.updatePosition(positionX, positionY);
            mouse.position()
        }
      }
    }
    canvasCtx.restore();
  }

  const hands = new Hands({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    },
  });
  hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });
  hands.onResults(onResults);

  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await hands.send({ image: videoElement });
    },
  });
  camera.start();
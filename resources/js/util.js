function loadNextImg() {
	imgIndex++;
	if (imgIndex >= imageCollection.length) {
		imgIndex = 0;
	}
	particles = particlesArray[imgIndex];
}

function loadImg(displayImage) {
	loadImage(displayImage.path, newImg => {
    	img = newImg;
		img.loadPixels();
		img.resize(IMG_RESIZED_WIDTH, 0);
		particlesArray.push(generateParticles(displayImage.particleColor));
  });
}
 
function preloadBatchImages() {
	imageCollection.forEach(image => {
		loadImg(image);
	});
}

// Collects valid positions where a particle can spawn onto.
function setupImg() {
	indices = [];
	for (let x = 0; x < img.width; x+=IMG_SCAN_STEPS * 4) {
		for (let y = 0; y < img.height; y+=IMG_SCAN_STEPS * 4) {
			let index = (x + y * img.width) * 4;
			
			let a = img.pixels[index + 3];
			if (a > 10) {
				indices.push(index);
			}
		}
	}
}

function generateParticles(particleColor) {
	let preloadParticles = [];
	
	setupImg();
	
	maxSize = map(
		particleCount, 
		MIN_PARTICLE_COUNT, MAX_PARTICLE_COUNT, 
		MAX_PARTICLE_SIZE, MIN_PARTICLE_SIZE);
	
	if (indices.length == 0) {
		return;
	}
	
	for (let i = 0; i < particleCount; i++) {
		let max_attempts = 20;
		let attempts = 0;
		let newParticle = null;

		// Pick a random position from the active image and attempt to spawn a valid particle.
		while (newParticle == null) {
			let index = indices[int(random(indices.length))];
			
			let x = (index / 4) % img.width;
			let y = (index / 4) / img.width;
			
			if (preloadParticles.length > 0) {
				let smallestSize = null;
				
				for (let i = 0; i < preloadParticles.length; i++) {
					let otherParticle = preloadParticles[i];
					let d = dist(x, y, otherParticle.target.x, otherParticle.target.y);
					let newSize = (d - (otherParticle.size / 2)) * 2;
					
					if (smallestSize == null || newSize < smallestSize) {
						smallestSize = newSize;
					}
				}
				
				if (smallestSize > 0) {
					newParticle = new Particle(
						x, y, 
						min(smallestSize, maxSize) * 0.75, 
						color(particleColor));
				}
			} else {
				newParticle = new Particle(
					x, y, 
					maxSize,
					color(particleColor));
			}
			
			attempts += 1;
			if (attempts > max_attempts) {
				break;
			}
		}

		if (newParticle != null) {
			preloadParticles.push(newParticle);	
		}
	}
	if (particles.length === 0) particles.push(...preloadParticles);
	return preloadParticles;	
}

function spawnParticles(index) {
	particles = particlesArray[index];
}

function nextDrawType() {
	drawType++;
	if (drawType >= Object.keys(DrawTypes).length) {
		drawType = 0;
	}
}

function getAverageArrayOfCoordinates(arr) {
	const average = arr.reduce((a, b) => a + b, 0) / arr.length;
}
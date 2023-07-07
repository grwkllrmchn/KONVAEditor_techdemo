const scaleBy = 1.1;

const getDistance = (p1, p2) => {
	return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

const getCenter = (p1, p2) => {
	return {
		x: (p1.x + p2.x) / 2,
		y: (p1.y + p2.y) / 2,
	};
}

let lastCenter = null;
let lastDist = 0;

export const zoomStage = (event, STAGE) => {
	event.evt.preventDefault();

	const oldScale = STAGE.scaleX();
	const pointerPosition = STAGE.getPointerPosition();

	const pointerX = pointerPosition.x;
	const pointerY = pointerPosition.y;

	const mousePointTo = {
		x: (pointerX - STAGE.x()) / oldScale,
		y: (pointerY - STAGE.y()) / oldScale,
	};

	const newScale = event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
	STAGE.scale({ x: newScale, y: newScale });

	const newPos = {
		x: pointerX - mousePointTo.x * newScale,
		y: pointerY - mousePointTo.y * newScale,
	};

	STAGE.position(newPos);
	STAGE.batchDraw();
}

export const handleTouch = (e, STAGE) => {
	e.evt.preventDefault();

	const touch1 = e.evt.touches[0];
	const touch2 = e.evt.touches[1];

	if (touch1 && touch2) {
		if (STAGE.isDragging()) {
			STAGE.stopDrag();
		}

		const p1 = {
			x: touch1.clientX,
			y: touch1.clientY,
		};
		const p2 = {
			x: touch2.clientX,
			y: touch2.clientY,
		};

		if (!lastCenter) {
			lastCenter = getCenter(p1, p2);
			return;
		}
		const newCenter = getCenter(p1, p2);

		const dist = getDistance(p1, p2);

		if (!lastDist) {
			lastDist = dist;
		}

		const pointTo = {
			x: (newCenter.x - stage.x()) / STAGE.scaleX(),
			y: (newCenter.y - stage.y()) / STAGE.scaleX(),
		};

		const scale = STAGE.scaleX() * (dist / lastDist);

		STAGE.scaleX(scale);
		STAGE.scaleY(scale);

		const dx = newCenter.x - lastCenter.x;
		const dy = newCenter.y - lastCenter.y;

		const newPos = {
			x: newCenter.x - pointTo.x * scale + dx,
			y: newCenter.y - pointTo.y * scale +dy,
		};

		STAGE.position(newPos);
		STAGE.batchDraw();

		lastDist = dist;
		lastCenter = newCenter;
	}
}

export function handleTouchEnd () {
	lastCenter = null;
	lastDist = 0;
}

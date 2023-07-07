let isPaint = false;
let lastLine;
let mode = 'brush';
let brushSize = 5;

document.addEventListener("DOMContentLoaded", () => {
	const BRUSHSELECT = document.getElementById('tool');
	BRUSHSELECT.addEventListener('change', () => {
		mode = BRUSHSELECT.value;
	});
	const BRUSHSIZESELECT = document.getElementById('brushSize');
	BRUSHSIZESELECT.addEventListener('change', () => {
		brushSize = BRUSHSIZESELECT.value;
	});
});

export function draw (e, STAGE, LAYER) {
	if (document.getElementById('drawChanger').checked) {
		isPaint = true;
		const pos = STAGE.getPointerPosition();
		lastLine = new Konva.Line({
			stroke: '#df4b26',
			strokeWidth: brushSize,
			globalCompositeOperation:
				mode === 'brush' ? 'source-over' : 'destination-out',
			lineCap: 'round',
			lineJoin: 'round',
			points: [pos.x, pos.y, pos.x, pos.y],
		});
		LAYER.add(lastLine);
	}
}

export const disabled = () => {
	if (document.getElementById('drawChanger').checked) {
		isPaint = false;
	}
}

export const addLine = (e, STAGE) => {
	if (document.getElementById('drawChanger').checked) {
		if (!isPaint) {
			return;
		}
		e.evt.preventDefault();
		const pos = STAGE.getPointerPosition();
		const newPoints = lastLine.points().concat([pos.x, pos.y]);
		lastLine.points(newPoints);
	}
}
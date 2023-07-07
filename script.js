import {zoomStage, handleTouch, handleTouchEnd} from './zoom.js';
import {draw, disabled, addLine} from './draw.js';
import {applyCrop, changeProportionsHandler} from './image.js';

document.addEventListener("DOMContentLoaded", () => {
	const uploadBtn = document.getElementById('uploadBtn');
	const proportionBtns = document.getElementsByClassName("proportion_btn");
	const drawChanger = document.getElementById('drawChanger');

	uploadBtn.addEventListener('change', uploadImageHandler);

	for (let i = 0; i < proportionBtns.length; i++) {
		proportionBtns[i].addEventListener("click", (event) => changeProportionsHandler(event, STAGE));
	}

	drawChanger.addEventListener('change', (e) => {
		const TRANSFORMERSLIST = STAGE.find('#imageTransformer');
		const IMAGESLIST = STAGE.find('.image');
		if (TRANSFORMERSLIST.length > 0) {
			if (e.target.checked) {
				IMAGESLIST[0].setAttrs({
					draggable: false,
				})
				TRANSFORMERSLIST[0].detach();
				LAYER.batchDraw();
			} else {
				TRANSFORMERSLIST[0].nodes(IMAGESLIST);
				IMAGESLIST[0].setAttrs({
					draggable: true,
				});
				LAYER.batchDraw();
			}
		}
	})
});

const selectedImages = [];
const imageObj = new Image();

let STAGE_PARAMS = {
	width: 433,
	height: 433
};

const STAGE = new Konva.Stage({
	container: 'container',
	width: window.innerWidth,
	height: window.innerHeight - 200,
});
STAGE.container().style.backgroundColor = '#ececec';

// TODO: найти лучшее решение как сделать рабочую область заметной
const FAKELAYER = new Konva.Layer();
const FAKEBORDER = new Konva.Rect({
	x: 400,
	y: 100,
	width: 1026,
	height: 602,
	fill: 'transparent',
	stroke: 'black',
	strokeWidth: 4,
});
FAKELAYER.add(FAKEBORDER)
STAGE.add(FAKELAYER)
// TODO:-----------------------------------------------------------

const LAYER = new Konva.Layer();
LAYER.clip({
	x: 400,
	y: 100,
	width: 1024,
	height: 600,
});
STAGE.add(LAYER);

imageObj.onload = () => {
	Konva.Image.fromURL(
		imageObj.src,
		(img) => {
			img.setAttrs({
				className: "images",
				width: imageObj.width,
				height: imageObj.height,
				// TODO: добавить прощёт координат добавления изображения относительно положения рабочей области
				x: 400,
				y: 100,
				name: 'image',
				draggable: true,
			});
			LAYER.add(img);

			applyCrop('center-middle', LAYER);

			const tr = new Konva.Transformer({
				id: "imageTransformer",
				nodes: [img],
				keepRatio: true,
				boundBoxFunc: (oldBox, newBox) => {
					if (newBox.width < 10 || newBox.height < 10) {
						return oldBox;
					}
					return newBox;
				},
			});

			LAYER.add(tr);
			img.on('transform', () => {
				if (!document.getElementById('drawChanger').checked) {
					img.setAttrs({
						scaleX: 1,
						scaleY: 1,
						width: img.width() * img.scaleX(),
						height: img.height() * img.scaleY(),
					});
					applyCrop(img.getAttr('lastCropUsed'), LAYER);
				}
			});

			img.on('click', (e) => {
				console.log(e);
				// TODO: добавить проверку на наличие картинки в массиве выбранных картинок и удалять оттуда, если есть
				selectedImages.push(e)
			})
		}
	)
};

const uploadImageHandler = (event) => {
	const file = event.target.files[0];
	const reader = new FileReader();

	reader.onload = (event) => {
		imageObj.src = event.target.result;
	};

	reader.readAsDataURL(file);
}

STAGE.on('mousedown touchstart', (e) => {
	draw(e, STAGE, LAYER);
});
STAGE.on('mouseup touchend', () => {
	disabled();
});
STAGE.on('mousemove touchmove', (e) => {
	addLine(e, STAGE);
});
STAGE.on('wheel', (e) => {
	zoomStage(e, STAGE);
});
STAGE.on('touchmove', (e) => {
	handleTouch(e, STAGE);
});
STAGE.on('touchend', () => {
	handleTouchEnd();
});

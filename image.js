export const getCrop = (image, size) => {
	const width = size.width;
	const height = size.height;
	const aspectRatio = width / height;

	let newWidth;
	let newHeight;

	const imageRatio = image.width / image.height;

	if (aspectRatio >= imageRatio) {
		newWidth = image.width;
		newHeight = image.width / aspectRatio;
	} else {
		newWidth = image.height * aspectRatio;
		newHeight = image.height;
	}

	return {
		cropWidth: newWidth,
		cropHeight: newHeight,
	};
}

export const applyCrop = (pos, LAYER) => {
	const img = LAYER.findOne('.image');
	img.setAttr('lastCropUsed', pos);
	const crop = getCrop(
		img.image(),
		{ width: img.width(), height: img.height() },
		pos
	);
	img.setAttrs(crop);
}

export const changeProportionsHandler = (event, LAYER, FAKELAYER, FAKEBORDER) => {
	const param = event.target.getAttribute("data-param");

	if (param === '1:1') {
		LAYER.clip({
			x: 400,
			y: 100,
			width: 433,
			height: 433,
		});
		FAKELAYER.clip({
			x: 400,
			y: 100,
			width: 433,
			height: 433,
		});
		FAKEBORDER.setAttrs({
			x: 400,
			y: 100,
			width: 433,
			height: 433,
			fill: 'transparent',
			stroke: 'black',
			strokeWidth: 4,
		})
	}

	if (param === '4:5') {
		LAYER.clip({
			x: 400,
			y: 100,
			width: 433,
			height: 542,
		});
		FAKELAYER.clip({
			x: 400,
			y: 100,
			width: 433,
			height: 542,
		});
		FAKEBORDER.setAttrs({
			x: 400,
			y: 100,
			width: 433,
			height: 542,
			fill: 'transparent',
			stroke: 'black',
			strokeWidth: 4,
		})
	}

	if (param === '16:9') {
		LAYER.clip({
			x: 400,
			y: 100,
			width: 963,
			height: 542,
		});
		FAKELAYER.clip({
			x: 400,
			y: 100,
			width: 963,
			height: 542,
		});
		FAKEBORDER.setAttrs({
			x: 400,
			y: 100,
			width: 963,
			height: 542,
			fill: 'transparent',
			stroke: 'black',
			strokeWidth: 4,
		})
	}

	if (param === '9:16') {
		LAYER.clip({
			x: 400,
			y: 100,
			width: 542,
			height: 963,
		});
		FAKELAYER.clip({
			x: 400,
			y: 100,
			width: 542,
			height: 963,
		});
		FAKEBORDER.setAttrs({
			x: 400,
			y: 100,
			width: 542,
			height: 963,
			fill: 'transparent',
			stroke: 'black',
			strokeWidth: 4,
		})
	}
}
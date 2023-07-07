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

export const changeProportionsHandler = (event, STAGE) => {
	const param = event.target.getAttribute("data-param");

	if (param === '1:1') {
		STAGE.width(433);
		STAGE.height(433);
	}

	if (param === '4:5') {
		STAGE.width(433);
		STAGE.height(542);
	}

	if (param === '16:9') {
		STAGE.width(963);
		STAGE.height(542);
	}

	if (param === '9:16') {
		STAGE.width(542);
		STAGE.height(963);
	}
}
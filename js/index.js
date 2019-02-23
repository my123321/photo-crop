window.addEventListener('DOMContentLoaded', function () {
	const input = document.querySelector('.upload input');
	const showImg = document.querySelector('.showImg');
	const  view = document.querySelector('.view');
	let img = null;
	input.addEventListener('change', function () {
		const file = this.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			img = document.createElement('img');
			img.src = reader.result;
			showImg.appendChild(img);
		}
	})
	let initX = 0, initY = 0, moveX = 0, moveY = 0;
	showImg.onmousedown = function (e) {
		initX = e.pageX;
		initY = e.pageY;
		showImg.onmousemove = function (e) {
			moveX = e.pageX;
			moveY = e.pageY;
			// 确定view的位置
			if (moveX - initX > 0) {
				view.style.left = initX - showImg.offsetLeft + 'px';
			} else {
				view.style.left = moveX - showImg.offsetLeft + 'px';
			}
			if (moveY - initY > 0) {
				view.style.top = initY - showImg.offsetTop + 'px';
			} else {
				view.style.top =  moveY - showImg.offsetTop + 'px';

			}
			view.style.height = Math.abs(moveY - initY) + 'px';
			view.style.width = Math.abs(moveX - initX) + 'px';
		}
		
	};

	showImg.onmouseup = function () {
		 console.dir(view)
		 const perW = img.naturalWidth / img.width; //原始图片和img标签宽度比
		 showImg.onmousemove = null;
		 	const canvas = document.querySelector('#cropImg');
			canvas.setAttribute('width', view.offsetWidth);
			canvas.setAttribute('height',view.offsetHeight);
			ctx=canvas.getContext('2d');
		 	console.dir(canvas)
			// ctx.drawImage(img, view.offsetLeft, view.offsetTop, view.offsetWidth, view.offsetHeight, 0, 0, view.offsetWidth, view.offsetHeight)
			ctx.drawImage(img, view.offsetLeft*perW, view.offsetTop*perW, img.naturalWidth, img.naturalHeight, 0, 0, img.width, img.height)
			// ctx.drawImage(img, view.offsetLeft*perW, view.offsetTop*perW, img.naturalWidth, img.naturalHeight)
	};
}, false);

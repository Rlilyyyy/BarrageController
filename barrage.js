var BarrageController = function(info) {

	'use strict';

	var barrageElem = document.getElementById(info.elemName);
	// 弹幕容器高度
	var elemHeight = barrageElem.offsetHeight;
	// 弹幕容器宽度
	var elemWidth = barrageElem.offsetWidth;
	// 每一条弹幕top增量
	var topDefault = 50;
	// 弹幕容器垂直允许的弹幕数量
	var topMax = parseInt(elemHeight / topDefault);
	// 当前弹幕处于垂直的位置
	var topIndex = -1;
	// 弹幕飘过时间变换范围
	var durationRange = 15;
	// 弹幕飘过最小时间
	var durationMin = 15;
	// 弹幕当前飘过时间
	var duration = durationMin;
	// 顶部居中弹幕垂直位置
	var topPosition = -1;
	// 底部居中弹幕垂直位置
	var bottomPosition = -1;
	// 弹幕发送人员身份
	var sender = {"ADMIN":"#c66b0c","VIP":"#ff0512","NORMAL":"black"};
	// 弹幕类型
	var barrageItemClass = {"NORMAL":"barrageItem","TOP":"barrageItem topBarrage","BOTTOM":"barrageItem topBarrage",0:"barrageItem",1:"barrageItem topBarrage",2:"barrageItem topBarrage"};
	// 弹幕顺序初始化旗帜
	var clear = false;
	// 弹幕顺序初始化时间间隔
	var clearTime = 2000;

	// 如果2000ms的时间内没有新的弹幕，则弹幕从头开始出现
	function clearTopIndex() {
		if(clear) {
			topIndex = -1;
		}else {
			clear = true;
		}
		setTimeout(clearTopIndex,clearTime);
	}

	setTimeout(clearTopIndex,clearTime);

	// 创建新的弹幕，传入image为头像地址，text为弹幕内容
	function createBarrageItemElem(barrage) {

		if(!barrage.text)	return;

		var barrageModel = document.createElement("div");
		var sonElem1 = document.createElement("div");
		var sonElem2 = document.createElement("div");
		var son1OfsonElem2 = document.createElement("span");
		var son2OfsonElem2 = document.createElement("span");


		if(barrageItemClass[barrage.position]) {
			barrageModel.className = barrageItemClass[barrage.position];
		}else {
			barrageModel.className = barrageItemClass["NORMAL"];
		}
		sonElem1.className = "barrageImg";
		sonElem2.className = "barrageText";

		if(barrage.image)
			sonElem1.style.backgroundImage = "url(" + barrage.image + ")";
		
		if(barrage.user) {
			son1OfsonElem2.className = "user";
			son1OfsonElem2.innerHTML = barrage.user;
		}

		son2OfsonElem2.innerHTML = barrage.text;

		if(barrage.textcolor) {
			son2OfsonElem2.style.color = barrage.textcolor;
		}

		if(barrage.sender) {
			if(sender[barrage.sender]) {
				son2OfsonElem2.style.color = sender[barrage.sender];
			}else {
				son2OfsonElem2.style.color = sender["NORMAL"];
			}
		}

		sonElem2.appendChild(son1OfsonElem2);
		sonElem2.appendChild(son2OfsonElem2);

		barrageModel.appendChild(sonElem1);
		barrageModel.appendChild(sonElem2);

		return barrageModel;
	}

	// 弹幕动画结束移除
	function handler() {
		barrageElem.removeChild(this);
		this.removeEventListener("webkitTransitionEnd",handler,false);
	}

	// 添加普通弹幕
	function appendBarrage(barrage) {
		var newElem = createBarrageItemElem(barrage);
		(topIndex >= 0 && topIndex <= topMax-2)?topIndex++:topIndex=0;
		newElem.style.top = topIndex % topMax * topDefault + "px";
		duration = parseInt(Math.random() * durationRange) + durationMin;
		// duration < durationMin?duration = durationMax:duration -= 2;
		
		newElem.style.transitionDuration = duration + "s";
		barrageElem.appendChild(newElem);
		
		setTimeout(function() {
			newElem.className += " barrageAnimation";
			newElem.addEventListener("webkitTransitionEnd",handler,false);
		},100);
	}

	// 添加顶部居中弹幕
	function appendTopBarrage(barrage) {
		var newElem = createBarrageItemElem(barrage);
		console.log(newElem);
		(topPosition >=0 && topPosition <= topMax-2)?topPosition++:topPosition = 0;
		newElem.style.top = topPosition % topMax * topDefault + "px";

		barrageElem.appendChild(newElem);

		setTimeout(function(){barrageElem.removeChild(newElem)},1000);
	}

	// 添加底部居中弹幕
	function appendBottomBarrage(barrage) {
		var newElem = createBarrageItemElem(barrage);
		
		(bottomPosition >=0 && bottomPosition <= topMax-2)?bottomPosition++:bottomPosition = 0;
		newElem.style.bottom = bottomPosition % topMax * topDefault + "px";

		barrageElem.appendChild(newElem);

		setTimeout(function(){barrageElem.removeChild(newElem)},1000);
	}

	return {
		addBarrage: function(barrage) {
			clear = false;
			switch(barrage.position) {
				case "NORMAL":
				case 0:
					appendBarrage(barrage);
					break;
				case "TOP":
				case 1:
					appendTopBarrage(barrage);
					break;
				case "BOTTOM":
				case 2:
					appendBottomBarrage(barrage);
					break;
				default:
					appendBarrage(barrage);
					break;
			}
			
		},
		setClearTime: function(newTime) {
			if(newTime > 0 && newTime) {
				clearTime = newTime;
			}
		}
	};
}
function renderView() {
	// DATAS.forEach(function(item) {
	// 	chrome.cookies.get({url:MASTER_URL, name:item}, function(c) {
	// 		var DOM = document.querySelector("#"+item);
	// 		DOM.value = c.value;
	// 	});
	// });
}

function bindEvent() {
	var siteListButton = document.querySelector("a#toggleSiteList");
	siteListButton && siteListButton.addEventListener("click", toggleSiteList);

	var plusButton = document.querySelector("button#plus");
	plusButton && plusButton.addEventListener("click", clickPlus);

	var delegation = new Delegate(document.body);
	var removeButtons = document.querySelectorAll("#list button.remove");
	removeButtons && removeButtons.forEach(function(button) {
		button.addEventListener("click", clickRemove);
	});
}

function init() {
	renderView();
	bindEvent();
}

function clickPlus() {
	window.findBoxIndex = window.findBoxIndex || 1;

	var $list = document.querySelector("#list");
	var $findBoxTemplate = document.querySelector("#template #findBox_");

	var $newFindBox = $findBoxTemplate.cloneNode(true);
	$newFindBox.id += window.findBoxIndex++;

	$list.appendChild($newFindBox);
}

function clickRemove(event) {
	event.currentTarget.parentElement.remove();
}


function toggleSiteList() {
	if(document.querySelector("#siteList").className.indexOf("hidden") >= 0) {
		document.querySelector("#siteList").className = "";
	} else {
		document.querySelector("#siteList").className = "hidden";
	}
}

window.addEventListener("load", init);
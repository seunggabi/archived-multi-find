function renderView() {
}

function bindEvent() {
	var $siteListButton = $("#toggleSiteList");
    $siteListButton && $siteListButton.on("click", toggleSiteList);

	var $plusButton = $("#plus");
    $plusButton && $plusButton.on("click", clickPlus);

	var $list = $("#list");
    $list && $list.on("click", "button.remove", clickRemove);
}

function init() {
	renderView();
	bindEvent();
}

function clickPlus() {
	window.findBoxIndex = window.findBoxIndex || 1;

	var $list = $("#list");
	var $template = $("#template #findBox_");

	var $new = $template.clone();
	$new.attr("id", $new.attr("id") + window.findBoxIndex++);

	$list.append($new);
}

function clickRemove(event) {
	event.target.parentElement.remove();
}


function toggleSiteList() {
	if(document.querySelector("#siteList").className.indexOf("hidden") >= 0) {
		document.querySelector("#siteList").className = "";
	} else {
		document.querySelector("#siteList").className = "hidden";
	}
}

window.addEventListener("load", init);
function matching(ids){
	chrome.tabs.executeScript({
		code: "document.querySelector('body').innerHTML"
	}, function (result) {
		ids.forEach(function(id) {
			var $target = $("#"+id);
			var bodyText = result[0];
			var match = bodyText.match(new RegExp($target.find(".text").val(), "gi")) || [];
			var totalCount = match.length;

			$target.find(".count").removeClass("hidden");
			$target.find(".total").html(totalCount);
		});
	});
}


chrome.storage.sync.get(function (data) {
	// document.querySelector("#user").value = data.userWords;
	// matching(data.ids);
});

function renderView() {}

function bindEvent() {
	$("#toggleSiteList").on("click", toggleSiteList);
	$("#plus").on("click", clickPlus);
	$("#list").on("click", "button.remove", clickRemove);

	$("body").on("click", "#find", function() {
		var ids = [];
		$("#list .findBox").each(function() {
			ids.push($(this).attr("id"));
		});

		chrome.storage.sync.set({
			ids: ids
		});

		matching(ids);
	});
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
function matching(ids){
    chrome.tabs.getAllInWindow(function(tabs){
    	tabs.forEach(function(tab) {
    		console.log(tab);
            chrome.tabs.executeScript(
                tab.id,
			    {
                    code: "document.querySelector('body').innerHTML"
	            },
	            function (result) {
	                ids.forEach(function(id) {
	                    var $target = $("#"+id.id);
	                    var bodyText = result[0];
	                    var match = bodyText.match(new RegExp(id.value, "gi")) || [];
	                    var totalCount = match.length;

	                    $target.find(".count").removeClass("hidden");
	                    $target.find(".total").html(totalCount);
	                });
	            }
            );
	    });
    });
}

function renderView(data) {
	var ids = data.ids || [];
	var length = ids.length;

	while(length > 1) {
		--length;
		clickPlus();
	}

    ids.forEach(function(id) {
        $("#"+id.id).find("input").val(id.value);
    });
}

function bindEvent() {
	$("#toggleSiteList").on("click", toggleSiteList);
	$("#plus").on("click", clickPlus);
	$("#list").on("click", "button.remove", function clickRemove(event) {
        event.target.parentElement.remove();
    });

	$("body").on("click", "#find", function() {
		var ids = [];
		$("#list .findBox").each(function() {
			ids.push({
				id: $(this).attr("id"),
				value: $(this).find("input").val()
			});
		});

		chrome.storage.sync.set({
			ids: ids
		});

		matching(ids);
	});
}

function clickPlus() {
	window.findBoxIndex = window.findBoxIndex || 1;

	var $list = $("#list");
	var $template = $("#template #findBox_");

	var $new = $template.clone();
	$new.attr("id", $new.attr("id") + window.findBoxIndex++);

	$list.append($new);
}

function toggleSiteList() {
	if(document.querySelector("#siteList").className.indexOf("hidden") >= 0) {
		document.querySelector("#siteList").className = "";
	} else {
		document.querySelector("#siteList").className = "hidden";
	}
}

window.addEventListener("load", function init() {
    bindEvent();

    chrome.storage.sync.get(function (data) {
        console.log(data);
        renderView(data);
    });
});
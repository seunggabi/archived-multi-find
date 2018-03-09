function matching(user){
	chrome.tabs.executeScript({
		code: 'document.querySelector("body").innerText'
	}, function (result) {
		var bodyText = result[0];
		var bodyNum = bodyText.split(' ').length;
		var myNum = bodyText.match(new RegExp('\\b(' + user + ')\\b', 'gi')).length;
		var per = myNum / bodyNum * 100;
		per = per.toFixed(1);
		document.querySelector('#result').innerText = myNum + '/' + bodyNum + '(' + (per) + '%)';
	});
}


chrome.storage.sync.get(function (data) {
	document.querySelector('#user').value = data.userWords;
	matching(data.userWords);
});

document.querySelector('#user').addEventListener('change', function () {
	var user = document.querySelector('#user').value;
	chrome.storage.sync.set({
		userWords: user
	});
	matching(user);
});
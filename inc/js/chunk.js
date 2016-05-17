!function(){
	
var repos;
	
function addRepos(isSearch, query) {
	isSearch = typeof isSearch !== 'undefined' ? isSearch : false;
	query = typeof query !== 'undefined' ? query : null;
	for(var key in repos) {
		if(repos.hasOwnProperty(key) && (!repos[key]["fork"])) {
			var repo = repos[key];
			var name = repo["name"];
			var link = repo["html_url"];
			var description = repo["description"];
			if(repo["homepage"])
				link = repo["homepage"]
			var reg = new RegExp(query, 'gi');
			if((isSearch && name.match(reg) != null) || !isSearch) {
				var chunkElement = $("<div>", {
					"class": "video-chunk"
				})
				.html("test")
				.html(
					$("<a>")
					.attr("href", link)
					.html(
						$("<div>", {
							"class": "video-chunk-thumbnail"
						})
						.attr("title", description)
						.css("background", "#000")
						.html(name)
					)
				);
				$("#list-chunk-container").append(chunkElement);
				$("#list-chunk-container div").last().fitText();
			}
		}
	}
}

function loadRepos() {
	var param = "sort=updated";
	$.ajax({  
		type: "GET",
		dataType:"json",
		url: "//api.github.com/users/rolandoislas/repos",
		data: param,  
		success: function(data){
			repos = data
			addRepos()
		}
	});
}

function doSearch() {
	var query = $("#search-field").val();
	$("#list-chunk-container").html('');
	addRepos(true, query)
}

function addEvents() {
	$("#search-form").submit(function(){
		doSearch();
		return false;
	});
	$("#search-field").on("input", function(){
		doSearch();
	});
	$("#search-submit").click(function(){
		doSearch();
	});
}

$(document).ready(function(){
	loadRepos();
	addEvents();
});

}()
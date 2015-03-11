!function(){
	
var repos = "";
	
function addRepos(isSearch, query) {
	isSearch = typeof isSearch !== 'undefined' ? isSearch : false;
	query = typeof query !== 'undefined' ? query : null;
	for(var key in repos) {
		if(repos.hasOwnProperty(key) && (!repos[key]["fork"])) {
			var repo = repos[key];
			var name = repo["name"];
			var link = repo["html_url"];
			if(repo["homepage"])
				link = repo["homepage"]
			var reg = new RegExp(query, 'gi');
			if((isSearch && name.match(reg) != null) || !isSearch)
				$("#list-chunk-container").append('<div class="video-chunk"><a href="' + link + '"><div class="video-chunk-thumbnail" title="' + name +'" style="background:#ccc url(/inc/img/thumb/' + name.toLowerCase() + '.jpg);background-size:cover;"></div></a></div>');
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
	$("#search-field").change(function(){
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
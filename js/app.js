
var showQuestion = function(question) {
	
	// clone our result template code
	var result = $('.templates .question').clone();
	
	// Set the question properties in result
	var questionElem = result.find('.question-text a');
	questionElem.attr('href', question.link);
	questionElem.text(question.title);

	// set the date asked property in result
	var asked = result.find('.asked-date');
	var date = new Date(1000*question.creation_date);
	asked.text(date.toString());

	// set the .viewed for question property in result
	var viewed = result.find('.viewed');
	viewed.text(question.view_count);

	// set some properties related to asker
	var asker = result.find('.asker');
	asker.html('<p>Name: <a target="_blank" '+
		'href=http://stackoverflow.com/users/' + question.owner.user_id + ' >' +
		question.owner.display_name +
		'</a></p>' +
		'<p>Reputation: ' + question.owner.reputation + '</p>'
	);

	return result;
};


// this function takes the results object from StackOverflow
// and returns the number of results and tags to be appended to DOM
var showSearchResults = function(query, resultNum) {
	var results = resultNum + ' results for <strong>' + query + '</strong>';
	return results;
};

// takes error string and turns it into displayable DOM element
var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};

// takes a string of semi-colon separated tags to be searched
// for on StackOverflow
var getUnanswered = function(tags) {
	
	// the parameters we need to pass in our request to StackOverflow's API
	var request = { 
		tagged: tags,
		site: 'stackoverflow',
		order: 'desc',
		sort: 'creation'
	};
	
	$.ajax({
		url: "http://api.stackexchange.com/2.2/questions/unanswered",
		data: request,
		dataType: "jsonp",//use jsonp to avoid cross origin issues
		type: "GET",
	})

	.done(function(result){ //this waits for the ajax to return with a succesful promise object
		var searchResults = showSearchResults(request.tagged, result.items.length);

		$('.search-results').html(searchResults);
		//$.each is a higher order function. It takes an array and a function as an argument.
		//The function is executed once for each item in the array.
		$.each(result.items, function(i, item) {
			var question = showQuestion(item);
			$('.results').append(question);
		});
	})
	.fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
};


$(document).ready( function() {
	$('.unanswered-getter').submit( function(e){
		e.preventDefault();
		// zero out results if previous search has run
		$('.results').html('');
		// get the value of the tags the user submitted
		var tags = $(this).find("input[name='tags']").val();
		getUnanswered(tags);
	});
});






// Top Answerers

var showAnswerer = function(answerer) {
	
	// clone our result template code
	var result = $('.templates2 .answer').clone();
	
	// Set the question properties in result
	var answerElem = result.find('.answerer-name a');
	answerElem.attr('href', answerer.user.link);
	answerElem.text(answerer.user.display_name);



   console.log(answerer.user);

	// set the date asked property in result
	// var asked = result.find('.asked-date');
	// var date = new Date(1000*answerer.creation_date);
	// asked.text(date.toString());

	// set the .viewed for question property in result
	var acceptRate = result.find('.accept-rate');
	acceptRate.text(answerer.user.accept_rate);

	var reputation = result.find('.reputation');
	reputation.text(answerer.user.reputation);

	// set some properties related to asker
	// var answerer = result.find('.answerer-name');
	// answerer.html('<p>Name: <a target="_blank" '+
	// 	'href=http://stackoverflow.com/users/' + answerer.items.user_id + ' >' +
	// 	answerer.items.display_name +
	// 	'</a></p>' +
	// 	'<p>Reputation: ' + answerer.items.reputation + '</p>'
	// );

	return result;
};


// this function takes the results object from StackOverflow
// and returns the number of results and tags to be appended to DOM
var showSearchResults2 = function(query, resultNum) {
	var results2 = resultNum + ' results for <strong>' + query + '</strong>';
	return results2;
};

// takes error string and turns it into displayable DOM element
var showError = function(error){
	var errorElem = $('.templates2 .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};

// takes a string of semi-colon separated tags to be searched
// for on StackOverflow
var getAnswerer = function(answered) {
	
	// the parameters we need to pass in our request to StackOverflow's API
	var request = { 
		tagged: answered,
		site: 'stackoverflow',
		order: 'desc',
	};
	
	$.ajax({
		url: "http://api.stackexchange.com/2.2/tags/" + answered + "/top-answerers/all_time",
		data: request,
		dataType: "jsonp",//use jsonp to avoid cross origin issues
		type: "GET",
	})

	.done(function(result){ //this waits for the ajax to return with a succesful promise object
		var searchResults2 = showSearchResults2(request.tagged, result.items.length);

		$('.search-results').html(searchResults2);
		//$.each is a higher order function. It takes an array and a function as an argument.
		//The function is executed once for each item in the array.
		$.each(result.items, function(i, item) {
			var answerer = showAnswerer(item);
			$('.results').append(answerer);
		});
	})
	.fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
};


$(document).ready( function() {
	$('.inspiration-getter').submit( function(e){
		e.preventDefault();
		// zero out results if previous search has run
		$('.results').html('');
		// get the value of the tags the user submitted
		var answered = $(this).find("input[name='answerers']").val();
		getAnswerer(answered);
	});
});




















// this function takes the question object returned by the StackOverflow request
// and returns new result to be appended to DOM
// var showQuestion = function(question) {
	
// 	// clone our result template code
// 	var result = $('.templates .question').clone();
	
// 	// Set the question properties in result
// 	var questionElem = result.find('.question-text a');
// 	questionElem.attr('href', question.link);
// 	questionElem.text(question.title);

// 	// set the date asked property in result
// 	var asked = result.find('.asked-date');
// 	var date = new Date(1000*question.creation_date);
// 	asked.text(date.toString());

// 	// set the .viewed for question property in result
// 	var viewed = result.find('.viewed');
// 	viewed.text(question.view_count);

// 	// set some properties related to asker
// 	var asker = result.find('.asker');
// 	asker.html('<p>Name: <a target="_blank" '+
// 		'href=http://stackoverflow.com/users/' + question.owner.user_id + ' >' +
// 		question.owner.display_name +
// 		'</a></p>' +
// 		'<p>Reputation: ' + question.owner.reputation + '</p>'
// 	);

// 	return result;
// };


// // this function takes the results object from StackOverflow
// // and returns the number of results and tags to be appended to DOM
// var showSearchResults = function(query, resultNum) {
// 	var results = resultNum + ' results for <strong>' + query + '</strong>';
// 	return results;
// };

// // takes error string and turns it into displayable DOM element
// var showError = function(error){
// 	var errorElem = $('.templates .error').clone();
// 	var errorText = '<p>' + error + '</p>';
// 	errorElem.append(errorText);
// };

// // takes a string of semi-colon separated tags to be searched
// // for on StackOverflow
// var getUnanswered = function(tags) {
	
// 	// the parameters we need to pass in our request to StackOverflow's API
// 	var request = { 
// 		tagged: tags,
// 		site: 'stackoverflow',
// 		order: 'desc',
// 		sort: 'creation'
// 	};
	
// 	$.ajax({
// 		url: "http://api.stackexchange.com/2.2/questions/unanswered",
// 		data: request,
// 		dataType: "jsonp",//use jsonp to avoid cross origin issues
// 		type: "GET",
// 	})

// 	.done(function(result){ //this waits for the ajax to return with a succesful promise object
// 		var searchResults = showSearchResults(request.tagged, result.items.length);

// 		$('.search-results').html(searchResults);
// 		//$.each is a higher order function. It takes an array and a function as an argument.
// 		//The function is executed once for each item in the array.
// 		$.each(result.items, function(i, item) {
// 			var question = showQuestion(item);
// 			$('.results').append(question);
// 		});
// 	})
// 	.fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
// 		var errorElem = showError(error);
// 		$('.search-results').append(errorElem);
// 	});
// };


// $(document).ready( function() {
// 	$('.unanswered-getter').submit( function(e){
// 		e.preventDefault();
// 		// zero out results if previous search has run
// 		$('.results').html('');
// 		// get the value of the tags the user submitted
// 		var tags = $(this).find("input[name='tags']").val();
// 		getUnanswered(tags);
// 	});
// });





// BACKUP

// this function takes the question object returned by the StackOverflow request
// and returns new result to be appended to DOM
// var showQuestion = function(question) {
	
// 	// clone our result template code
// 	var result = $('.templates .question').clone();
	
// 	// Set the question properties in result
// 	var questionElem = result.find('.question-text a');
// 	questionElem.attr('href', question.link);
// 	questionElem.text(question.title);

// 	// set the date asked property in result
// 	var asked = result.find('.asked-date');
// 	var date = new Date(1000*question.creation_date);
// 	asked.text(date.toString());

// 	// set the .viewed for question property in result
// 	var viewed = result.find('.viewed');
// 	viewed.text(question.view_count);

// 	// set some properties related to asker
// 	var asker = result.find('.asker');
// 	asker.html('<p>Name: <a target="_blank" '+
// 		'href=http://stackoverflow.com/users/' + question.owner.user_id + ' >' +
// 		question.owner.display_name +
// 		'</a></p>' +
// 		'<p>Reputation: ' + question.owner.reputation + '</p>'
// 	);

// 	return result;
// };


// // this function takes the results object from StackOverflow
// // and returns the number of results and tags to be appended to DOM
// var showSearchResults = function(query, resultNum) {
// 	var results = resultNum + ' results for <strong>' + query + '</strong>';
// 	return results;
// };

// // takes error string and turns it into displayable DOM element
// var showError = function(error){
// 	var errorElem = $('.templates .error').clone();
// 	var errorText = '<p>' + error + '</p>';
// 	errorElem.append(errorText);
// };

// // takes a string of semi-colon separated tags to be searched
// // for on StackOverflow
// var getUnanswered = function(tags) {
	
// 	// the parameters we need to pass in our request to StackOverflow's API
// 	var request = { 
// 		tagged: tags,
// 		site: 'stackoverflow',
// 		order: 'desc',
// 		sort: 'creation'
// 	};
	
// 	$.ajax({
// 		url: "http://api.stackexchange.com/2.2/questions/unanswered",
// 		data: request,
// 		dataType: "jsonp",//use jsonp to avoid cross origin issues
// 		type: "GET",
// 	})

// 	.done(function(result){ //this waits for the ajax to return with a succesful promise object
// 		var searchResults = showSearchResults(request.tagged, result.items.length);

// 		$('.search-results').html(searchResults);
// 		//$.each is a higher order function. It takes an array and a function as an argument.
// 		//The function is executed once for each item in the array.
// 		$.each(result.items, function(i, item) {
// 			var question = showQuestion(item);
// 			$('.results').append(question);
// 		});
// 	})
// 	.fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
// 		var errorElem = showError(error);
// 		$('.search-results').append(errorElem);
// 	});
// };


// $(document).ready( function() {
// 	$('.unanswered-getter').submit( function(e){
// 		e.preventDefault();
// 		// zero out results if previous search has run
// 		$('.results').html('');
// 		// get the value of the tags the user submitted
// 		var tags = $(this).find("input[name='tags']").val();
// 		getUnanswered(tags);
// 	});
// });







// var showQuestion = function(question) {
	
// 	// clone our result template code
// 	var result = $('.templates2 .question').clone();
	
// 	// Set the question properties in result
// 	var questionElem = result.find('.question-text a');
// 	questionElem.attr('href', question.link);
// 	questionElem.text(question.title);

// 	// set the date asked property in result
// 	var asked = result.find('.asked-date');
// 	var date = new Date(1000*question.creation_date);
// 	asked.text(date.toString());

// 	// set the .viewed for question property in result
// 	var viewed = result.find('.viewed');
// 	viewed.text(question.view_count);

// 	// set some properties related to asker
// 	var answerer = result.find('.answerer-name');
// 	answerer.html('<p>Name: <a target="_blank" '+
// 		'href=http://stackoverflow.com/users/' + question.owner.user_id + ' >' +
// 		question.owner.display_name +
// 		'</a></p>' +
// 		'<p>Reputation: ' + question.owner.reputation + '</p>'
// 	);

// 	return result;
// };


// // this function takes the results object from StackOverflow
// // and returns the number of results and tags to be appended to DOM
// var showSearchResults = function(query, resultNum) {
// 	var results = resultNum + ' results for <strong>' + query + '</strong>';
// 	return results;
// };

// // takes error string and turns it into displayable DOM element
// var showError = function(error){
// 	var errorElem = $('.templates2 .error').clone();
// 	var errorText = '<p>' + error + '</p>';
// 	errorElem.append(errorText);
// };

// // takes a string of semi-colon separated tags to be searched
// // for on StackOverflow
// var getUnanswered = function(tags) {
	
// 	// the parameters we need to pass in our request to StackOverflow's API
// 	var request = { 
// 		tagged: tags,
// 		site: 'stackoverflow',
// 		order: 'desc',
// 		sort: 'creation'
// 	};
	
// 	$.ajax({
// 		url: "http://api.stackexchange.com/2.2/tags/" + tag + "/top-answerers",
// 		data: request,
// 		dataType: "jsonp",//use jsonp to avoid cross origin issues
// 		type: "GET",
// 	})

// 	.done(function(result){ //this waits for the ajax to return with a succesful promise object
// 		var searchResults = showSearchResults(request.tagged, result.items.length);

// 		$('.search-results').html(searchResults);
// 		//$.each is a higher order function. It takes an array and a function as an argument.
// 		//The function is executed once for each item in the array.
// 		$.each(result.items, function(i, item) {
// 			var question = showQuestion(item);
// 			$('.results').append(question);
// 		});
// 	})
// 	.fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
// 		var errorElem = showError(error);
// 		$('.search-results').append(errorElem);
// 	});
// };


// $(document).ready( function() {
// 	$('.inspiration-getter').submit( function(e){
// 		e.preventDefault();
// 		// zero out results if previous search has run
// 		$('.results').html('');
// 		// get the value of the tags the user submitted
// 		var tags = $(this).find("input[name='tags']").val();
// 		getUnanswered(tags);
// 	});
// });


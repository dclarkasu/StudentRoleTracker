$(document).ready(function(){
	console.log("Loaded");
	index();
});

//Index/Show all Students function
var index = function(){
	$.ajax({
		type : 'GET',
		url : 'rest/students',
		dataType : 'json'
	})
	.done(generateTable)
	.fail(function(xhr, status , err){
		console.error("Failed Index Request");
		console.error(err);
	})
};

var generateTable = function(data, status) {
	console.log("test")
	console.log(data);
	//Create table Head element content
	var $table = $('<table>');
	var $tHeaderName = $('<th>').text('Student Name');
	var $tHeaderView = $('<th>').text('View');
	var $tHeadRow = $('<tr>').attr('id', 'tableHead').append($tHeaderName, $tHeaderView);
	var $tHead = $('<thead>').append($tHeadRow);
	$table.append($tHead);

	//Create table body content
	var $tBody = $('<tbody>').attr('id', 'tableBody');

	data.forEach(function(student, idx){
		var $tDataName = $('<td>').text(student.firstName + " " + student.lastName);
		var $tDataView = $('<button>');
		$tDataView.text('View');
		console.log(student.id)
		console.log("test")
		$tDataView.attr('id', student.id);
		$tDataView.click(viewBtnHandler);
		var $tRow = $('<tr>').append($tDataName, $tDataView);
		$tBody.append($tRow);
	});
	$table.append($tBody);

	$('#content').append($table);
};

var viewBtnHandler = function(){
	console.log("View clicked");
	jsController(this.id, showStudent);
};

var jsController = function(studentNum, callbackFunc) {
	console.log(studentNum)
	$.ajax({
		type : 'GET',
		url : 'rest/students/' + studentNum,
		dataType : 'json'
	})
	.done(callbackFunc)
	.fail(function(xhr, status, err){
		console.error("Failed GET Request");
		console.error(err);
	})
};

var showStudent = function(data) {
	console.log("in showStudent");
	console.log(data);
}

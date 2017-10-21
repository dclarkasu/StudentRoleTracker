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
//Creates table on index.html
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
		//Button Creation
		var $tDataView = $('<button>');
		$tDataView.text('View');
		console.log(student.id)
		$tDataView.attr('id', student.id);
		$tDataView.click(viewBtnHandler);
		//Create table row
		var $tRow = $('<tr>').append($tDataName, $tDataView);
		$tBody.append($tRow);
	});
	$table.append($tBody);

	$('#content').append($table);
};

var viewBtnHandler = function(){
	console.log("View clicked");
	jsGetController(this.id, showStudent);
};

var jsGetController = function(studentNum, callbackFunc) {
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

var showStudent = function(student) {
	console.log("in showStudent");
	console.log(student);
	$('#content').empty();

	var $containerDiv = $('<div>').attr('id', 'containerDiv');
	var $infoDiv = $('<div>').attr('id', 'infoDiv');
	var $roleDiv = $('<div>').attr('id', 'roleDiv');

	//Build $infoDiv
	var $nameHeader = $('<h2>').text(student.firstName + " " + student.lastName)
	var $grade = $('<h3>').text(student.grade);
	$infoDiv.append($nameHeader, $grade);

	//Build $roleDiv
	var $roleListHeader = $('<h3>').text('Roles: ');
	var $roleList = $('<ul>').append($roleListHeader);
	student.roles.forEach(function(r, idx){
		$roleList.append($('<li>').text(r.name));
	});
	$roleDiv.append($roleList);

	$containerDiv.append($infoDiv, $roleDiv);
	var $editStudentBtn = $('<button>').text('Edit Student').click(editStudentForm);

	$('#content').append($containerDiv, $editStudentBtn);
}

var editStudentForm = function(student) {
	console.log('Edit student Form');
}

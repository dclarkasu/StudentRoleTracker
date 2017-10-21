$(document).ready(function(){
	console.log("Loaded");
	jsGetController('', generateIndexTable);
});

//Index/Show all Students function
// var index = function(){
// 	$.ajax({
// 		type : 'GET',
// 		url : 'rest/students',
// 		dataType : 'json'
// 	})
// 	.done(generateIndexTable)
// 	.fail(function(xhr, status , err){
// 		console.error("Failed Index Request");
// 		console.error(err);
// 	})
// };

//Creates table on index.html
var generateIndexTable = function(data, status) {
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
	//Create Student btn
	var $createStudentBtn = $('<button>').text('Create Student');
	$createStudentBtn.attr('id', 'createStudentBtn')
		.click(createBtnHandler);

	$table.append($tBody);
	$('#content').append($table, $createStudentBtn);
};
//Handles e.l. for View btn
var viewBtnHandler = function(){
	console.log("View clicked");
	jsGetController(this.id, showStudent);
};
//Handles Create New Student btn
var createBtnHandler = function(){
	console.log("Create Stud btn clicked");
	buildNewStudentForm();
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
//Shows individual student data
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
	$roleListHeader.append($('<button>').text("Edit Role").click(editRole));

	var $roleList = $('<ul>').append($roleListHeader);
	student.roles.forEach(function(r, idx){
		$roleList.append($('<li>').text(r.name));
	});
	$roleDiv.append($roleList);

	//Edit Student btn
	var $editStudentBtn = $('<button>').text('Edit Student').click(editStudentForm);

	//Delete Student btn
	// var $btnDiv = $('<div>').attr('id', 'deleteStudentBtn');
	var $deleteStudentBtn = $('<button>').text('Delete Student').click(deleteStudent);

	$containerDiv.append($infoDiv, $roleDiv);
	$('#content').append($containerDiv, $editStudentBtn, $deleteStudentBtn);
}
//Buttons
var editStudentForm = function(student) {
	console.log('Edit student Form');
	console.log(student);
}

var deleteStudent = function(student) {
	console.log('Delete student clicked');
	console.log(student);
}

var editRole = function(role) {
	console.log("In edit role");
	console.log(role);
};

var buildNewStudentForm = function() {
	var $form = $('<form name="newStudentForm">');
	$form.append($('<fieldset>'));
	$form.append($('<legend>').text('Create Student'));

	var $fNameInput = $('<input>'); //type text is default
	$fNameInput.attr('name', 'fName');
	$fNameInput.attr('placeholder', 'First Name');

	var $lNameInput = $('<input>');
	$lNameInput.attr('name', 'lName');
	$lNameInput.attr('placeholder', 'Last Name');

	var $grade = $('<input>');
	$grade.attr('name', 'grade');
	$grade.attr('placeholder', 'Grade');

	var $submit = $('<input type="submit">');
	$submit.val('Submit');
	//Append everything to html
	$submit.click(createNewStudent);
	$form.append($fNameInput, $lNameInput, $grade, $submit);
	$('#content').append($form);
	$('#createStudentBtn').remove();
};

var createNewStudent = function(e){
	e.preventDefault();
	console.log("In createNewStudent");

	var newStudent = {};
	newStudent.firstName = $(newStudentForm.fName).val();
	newStudent.lastName = $(newStudentForm.lName).val();
	newStudent.grade = $(newStudentForm.grade).val();
	console.log(newStudent);
};

$(document).ready(function(){
	console.log("Loaded");
	jsGetController('', generateIndexTable);
});

//**************************************************
//Creates table on index.html
var generateIndexTable = function(data, status) {
	console.log("test")
	console.log(data);
	$('#content').empty();
	//Create table Head element content
	var $table = $('<table>');
	var $tHeaderName = $('<th>').text('Student Name');
	var $tHeaderView = $('<th>').text('View');
	var $tHeadRow = $('<tr>').attr('id', 'tableHead').append($tHeaderName, $tHeaderView);
	var $tHead = $('<thead>').append($tHeadRow);
	$table.append($tHead);
//**************************************************
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
//**************************************************
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
//**************************************************
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
	var $newRoleBtn = $('<button>').text('Add New Role')
	$newRoleBtn.attr("id", student.id);
	$newRoleBtn.click(function(e){
		newRoleHandler(this.id);
	})
	$roleListHeader.append($newRoleBtn);

	var $roleList = $('<ul>').append($roleListHeader);
	// var $editRoleBtn = $('<button>').text("Edit Role").click(editRoleHandler);
	//For each for Roles list
	student.roles.forEach(function(r, idx){
		var $liRoles = $('<li>').text(r.name);
		var $editRoleBtn = $('<button>').text("Edit Role").click(function(e){
			editRoleHandler(student.id, r.id);
		});
		$liRoles.append($editRoleBtn);
		$roleList.append($liRoles);
	});
	$roleDiv.append($roleList);

	//Edit Student btn
	var $editStudentBtn = $('<button>').text('Edit Student').attr('id', student.id).click(editStudentHandler);

	//Delete Student btn
	var $deleteStudentBtn = $('<button>').text('Delete Student').attr('id', student.id).click(deleteBtnHandler);

	var $returnBtn = $('<button>').text('Return to Home').click(returnHome);

	$containerDiv.append($infoDiv, $roleDiv);
	$('#content').append($containerDiv, $editStudentBtn, $deleteStudentBtn, $returnBtn);
};
//**************************************************
//showStudent Button Listeners
var editStudentHandler = function() {
	console.log('Edit student Form clicked');
	buildUpdateStudentForm(this.id);
};

var deleteBtnHandler = function() {
	console.log('Delete student clicked');
	deleteStudent(this.id);
};

var editRole = function(role) {
	console.log("In edit role");
	console.log(role);
};

var returnHome = function() {
	console.log('Edit student Form');
	jsGetController('', generateIndexTable);
};

var editRoleHandler = function(studentId, roleId) {
	console.log('Edit Role clicked');
	buildAddRoleForm(studentId, roleId);
};

var newRoleHandler = function(id) {
	console.log('New Role clicked');
	buildNewRoleForm(id);
};
//**************************************************
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
//**************************************************
var createNewStudent = function(e){
	e.preventDefault();
	console.log("In createNewStudent");

	var newStudent = {};
	newStudent.firstName = $(newStudentForm.fName).val();
	newStudent.lastName = $(newStudentForm.lName).val();
	newStudent.grade = $(newStudentForm.grade).val();
	newStudent.roles = [];
	console.log(newStudent);

	$.ajax({
		type : 'POST',
		url : 'rest/students',
		dataType : 'json',
		contentType : 'application/json',
		data : JSON.stringify(newStudent)
	})
	.done(showStudent)
	.fail(function(xhr, status, err){
		console.error("Failed Student POST");
		console.error(err);
	})
};
//**************************************************
var editStudent = function(id, e) {
	e.preventDefault();
	console.log('In edit student ' + id);
	console.log("test" + $(updateStudentForm.fName).val());
	var studToEdit = {
		firstName : $(updateStudentForm.fName).val(),
		lastName : $(updateStudentForm.lName).val(),
		grade : $(updateStudentForm.grade).val(),
		roles : []
	};

	$.ajax({
		type : 'PUT',
		url : 'rest/students/'+id,
		dataType : 'json',
		contentType : 'application/json',
		data : JSON.stringify(studToEdit)
	})
	//returns user to the same showStudent view
	.done(showStudent(studToEdit))
	.fail(function(xhr, status, err) {
		console.error("Failed Student PUT");
		console.error(err);
	})
};
//**************************************************
var deleteStudent = function(id) {
	if (window.confirm("Are you sure you want to delete this?")) {
		$.ajax({
			type : 'DELETE',
			url : 'rest/students/'+id
		})
		.done(function(data){
			//returns to home showing all students
			jsGetController('', generateIndexTable);
			console.log("Delete true");
		})
		.fail(function(xhr, status, err){
			console.error("Failed Delete Student");
			console.error(err);
		})
	} else {
		//returns user to the same showStudent view
		jsGetController(this.id, showStudent);
	}
};
//**************************************************
var buildUpdateStudentForm = function(studentID) {
	var $form = $('<form name="updateStudentForm">');
	$form.append($('<fieldset>'));
	$form.append($('<legend>').text('Update Student'));

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
	$submit.val('Update');
	//Append everything to html
	$submit.click(function(e){
		editStudent(studentID, e);
	});
	$form.append($fNameInput, $lNameInput, $grade, $submit);
	$('#content').append($form);
	// $('#createStudentBtn').remove();
};
//**************************************************
var buildNewRoleForm = function(id){
	console.log("In new role form");
	console.log("Students id: " + id);
	var $newRoleForm = $('<form name="newRoleForm">');
	$newRoleForm.append($('<fieldset>'));
	$newRoleForm.append($('<legend>').text('Create Role'));

	var $name = $('<input>'); //type text is default
	$name.attr('name', 'name');
	$name.attr('placeholder', 'Role Name');

	var $description = $('<input>');
	$description.attr('name', 'description');
	$description.attr('placeholder', 'Description');

	// var $isCurrent = $('<input>');
	// $isCurrent.attr('name', 'isCurrent');
	// $isCurrent.attr('placeholder', 'Currently Assigned');

	var $submit = $('<input type="submit">');
	$submit.val('Create');


	//Append everything to html
	$submit.click(function(e){
		createNewRole(e, id);
	});
	$newRoleForm.append($name, $description, $submit);
	$('#content').append($newRoleForm);
};
//**************************************************
var buildAddRoleForm = function(studentId, roleId){
	console.log("In new role form");
	console.log("Students id: " + studentId);
	var $newRoleForm = $('<form name="newRoleForm">');
	$newRoleForm.append($('<fieldset>'));
	$newRoleForm.append($('<legend>').text('Create Role'));

	var $name = $('<p>'); //type text is default
	$name.attr('name', 'name');
	$name.text("NAME OF ROLE");

	var $description = $('<input>');
	$description.attr('name', 'description');
	$description.attr('placeholder', 'Description');

	// var $isCurrent = $('<input>');
	// $isCurrent.attr('name', 'isCurrent');
	// $isCurrent.attr('placeholder', 'Currently Assigned');

	var $submit = $('<input type="submit">');
	$submit.val('Create');


	//Append everything to html
	$submit.click(function(e){
		createAddRole(e, studentId, roleId);
	});
	$newRoleForm.append($name, $description, $submit);
	$('#content').append($newRoleForm);
};
//**************************************************
var createNewRole = function(e, id) {
	e.preventDefault();
	console.log("in cerate new role");

	var newRole = {
		name : $(newRoleForm.name).val(),
		description  : $(newRoleForm.description).val()
	};
	console.log(newRole);

	$.ajax({
		type : 'POST',
		url : 'rest/students/' + id + "/roles",
		dataType : 'json',
		contentType : 'application/json',
		data : JSON.stringify(newRole)
	})
}
//**************************************************
//Update method for roles
var createAddRole = function(e, studentId, roleId) {
	e.preventDefault();
	console.log("in cerate new role");

	var newRole = {
		name : "Hall Monitor",
		description  : $(newRoleForm.description).val()
	};
	console.log(newRole);

	$.ajax({
		type : 'PUT',
		url : 'rest/students/' + studentId + "/roles/" + roleId,
		dataType : 'json',
		contentType : 'application/json',
		data : JSON.stringify(newRole)
	})
}

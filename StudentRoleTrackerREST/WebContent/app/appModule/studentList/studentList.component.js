angular.module('appModule').component('studentList', {
	templateUrl : 'app/appModule/studentList/studentList.component.html',
	controller : function(studentService) {
		var vm = this;
		
		vm.students = [];
		
		vm.selected = null;
		
		vm.assignedStudents = [];
		
		//Behaviors
		vm.getAllStudents = function() {
			//returns response object containing data
			var res = studentService.index();
			res.then(function(res){
				console.log(res.data);
				vm.students = res.data;
			})
		}
		//Gets full student list initially
		vm.getAllStudents();
		
		//Keeps current student count
		vm.studentCount = function() {
			return vm.students.length;
//			return $filter('incomplete')(vm.todos).length;
		}
		
		vm.setNewStudent = function() {
			vm.newStudent = {};
		}
		
		vm.addStudent = function(stud) {
			studentService.create(stud)
			.then(function(res) {
				console.log(stud);
				vm.students.push(res.data)
				vm.getAllStudents();
			})
		}
		
		vm.displayStudent = function(student) {
			vm.selected = student;
		}
		
		vm.displayFullTable = function() {
			vm.selected = null;
			vm.studentToEdit = null;
			vm.roleToEdit = null;
		}
		
		vm.setEditStudent = function() {
			vm.studentToEdit = angular.copy(vm.selected);
			vm.roleToEdit = null;
		}
		
		vm.updateStudent = function(student) {
			console.log(student);
			studentService.update(student.id, student)
			.then(function(res){
				vm.getAllStudents();
				vm.displayFullTable();
			})
		}
		
		vm.cancel = function(student) {
			vm.displayStudent(student);
			vm.studentToEdit = null;
		}
		
		vm.deleteStudent = function(id) {
			console.log(id);
			studentService.destroy(id)
			.then(function(res){
				vm.getAllStudents();
				vm.displayFullTable();
			})
		}
		
		vm.getAssignedStudents = function() {
			studentService.indexAssignedStudents()
			.then(function(res) {
				vm.assignedStudents = res.data;
				console.log(vm.assignedStudents);
			})
		}
		
		vm.hideAssigned = function() {
			vm.assignedStudents = [];
		}
		
		//Role Behaviors
		
		//Refreshes role list for a student
		vm.reloadRoles = function(student) {
			console.log(student.id);
			
			studentService.indexRoles(student.id)
			.then(function(res) {
				console.log(res.data);
				vm.displayStudent(student);
			})
		}
		
		vm.setNewRole = function() {
			vm.newRole = {};
		}
		
		vm.addRole = function(sid, role) {
			studentService.createRole(sid, role)
			.then(function(res) {
				console.log(role);
				vm.selected.roles.push(res.data);
				vm.getAllStudents();
				vm.displayStudent(vm.selected);
			})
		}
		
		vm.setEditRole = function(role) {
			vm.roleToEdit = angular.copy(role);
		}
		
		vm.updateRole = function(student, role) {
			console.log('In updateRole component.js');
			console.log('student fName: ' + student.firstName + " role name: " + role.name);
			studentService.updateRole(student.id, role.id, role)
			.then(function(res){
				vm.getAllStudents();
//				vm.reloadRoles(vm.selected);
				vm.displayStudent(vm.selected);
			})
		}
		
		//Deletes role by student id and role id
		vm.deleteRole = function(student, rid) {
			console.log(student.id, rid);
			
			studentService.destroyRole(student.id, rid)
			.then(function(res){
				vm.getAllStudents();
				vm.reloadRoles(vm.selected);
//				vm.displayStudent(vm.selected);
			})
		}
	},
	controllerAs : 'vm'
});
angular.module('appModule').component('studentList', {
	templateUrl : 'app/appModule/studentList/studentList.component.html',
	controller : function(studentService) {
		var vm = this;
		
		vm.students = [];
		
		vm.selected = null;
		
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
		}
		
		vm.setEditStudent = function() {
			vm.studentToEdit = angular.copy(vm.selected);
		}
		
		vm.updateStudent = function(student) {
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
	},
	controllerAs : 'vm'
});
angular.module('appModule').factory('studentService', function($http) {
	var service = {};
	
	service.index = function() {
		return $http ({
			method : 'GET',
			url : 'rest/students'
		});
	}
	
	service.show = function(id) {
		return $http ({
			method : 'GET',
			url : 'rest/students/'+id
		});
	}
	
	service.create = function(student) {
//		todo.completed = false;
//		todo.description = '';
		return $http ({
			method : 'POST',
			url : 'rest/students',
			headers : {
				'ContentType' : 'application/json'
			},
			data : student
		})
	};
	
	service.update = function(id, student) {
//		Sets completed Date property to current date/time before sending request to DB
//		if (todo.completed === true) {
//			todo.completeDate = $filter('date')(Date.now(), 'MM/dd/yyyy');
//		} else {
//			todo.completeDate = "";
//		}
		return $http({
		      method : 'PUT',
		      url : 'rest/students/' + id,
		      headers : {
		        'Content-Type' : 'application/json'
		      },
		      data : student
		    })
	};
	
	service.destroy = function(id) {
		return $http ({
			method : 'DELETE',
			url : 'rest/students/' + id
		})
	};
	
	service.indexAssignedStudents = function() {
		return $http ({
			method : 'GET',
			url : 'rest/students/roles'
		})
	}
	
	//Role requests
	
	service.createRole = function(sid, role) {

		return $http ({
			method : 'POST',
			url : 'rest/students/'+sid+'/roles',
			headers : {
				'ContentType' : 'application/json'
			},
			data : role
		})
	};
	
	service.updateRole = function(sid, rid, role) {
//		Sets completed Date property to current date/time before sending request to DB
//		if (todo.completed === true) {
//			todo.completeDate = $filter('date')(Date.now(), 'MM/dd/yyyy');
//		} else {
//			todo.completeDate = "";
//		}
		console.log("sid: " +sid + "rid: " + rid + "role: " + role)
		return $http({
		      method : 'PUT',
		      url : 'rest/students/'+ sid +'/roles/'+rid,
		      headers : {
		        'Content-Type' : 'application/json'
		      },
		      data : role
		    })
	};
	
	service.destroyRole = function(sid, rid) {
		return $http ({
			method : 'DELETE',
			url : 'rest/students/'+sid+'/roles/'+rid
		})
	}
	
	service.indexRoles = function(id) {
		return $http ({
			method : 'GET',
			url : 'rest/students/'+id+'/roles'
		});
	}
	//Must always return the object created first in the service
	
	return service;
});
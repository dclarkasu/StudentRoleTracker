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
	//Must always return the object created first in the service
	
	return service;
});
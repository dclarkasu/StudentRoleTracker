package controllers;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.StudentDAO;
import entities.Role;
import entities.Student;

@RestController
public class StudentController {
	
	@Autowired
	private StudentDAO studentdao;
	
	@RequestMapping(path="ping", method=RequestMethod.GET)
	public String ping() {
		return "pong";
	}
	
	@RequestMapping(path="students", method=RequestMethod.GET)
	public List<Student> index(HttpServletResponse res) {
		List<Student> list = studentdao.getAllStudents();
		System.out.println("test");
		return list;
	}

	@RequestMapping(path="students/{id}", method=RequestMethod.GET)
	public Student show(@PathVariable int id, HttpServletResponse res) {
		Student showStud = studentdao.showStudentById(id);
		if (showStud == null) {
			res.setStatus(404);
			return null;
		} else {
			return showStud;
		}
	}
	
	@RequestMapping(path="students", method=RequestMethod.POST)
	public Student create(@RequestBody String studentJSON, HttpServletResponse res) {
		Student newStudent = studentdao.createNewStudent(studentJSON);
		if (newStudent == null) {
			res.setStatus(400);
			return null;
		} else {
			res.setStatus(200);
			return newStudent;
		}
	}
	
	@RequestMapping(path="students/{id}", method=RequestMethod.PUT)
	public Student update(@PathVariable int id, @RequestBody String studentJSON, HttpServletResponse res) {
		Student updatedStudent = studentdao.updateStudentById(id, studentJSON);
		if (updatedStudent == null) {
			res.setStatus(404);
			return null;
		} else {
			return updatedStudent;
		}
	}

	@RequestMapping(path="students/{id}", method=RequestMethod.DELETE)
	public boolean destroyStudent(@PathVariable int id, HttpServletResponse res) {
		if (studentdao.destroyStudentById(id) == false) {
			res.setStatus(400);
			return false;
		} else {
			res.setStatus(200);
			return true;
		}
	}

	@RequestMapping(path="students/{id}/roles", method=RequestMethod.GET)
	public List<Role> indexRolesByStudentID(@PathVariable int id, HttpServletResponse res) {
		List<Role> roles = studentdao.getAllRolesByStudentID(id);
		if (roles == null) {
			res.setStatus(400);
			return null;
		} else {
			res.setStatus(200);
			return roles;
		}
	}

	@RequestMapping(path="students/{id}/roles", method=RequestMethod.POST)
	public Role createNewRoleWithStudentID(@PathVariable int id, @RequestBody String roleJSON, HttpServletResponse res) {
		System.out.println(roleJSON);
		Role newRole = studentdao.createNewRole(id, roleJSON);
		if (newRole == null) {
			res.setStatus(400);
			return null;
		} else {
			res.setStatus(200);
			return newRole;
		}
	}

	@RequestMapping(path="students/{studentID}/roles/{roleID}", method=RequestMethod.DELETE)
	public boolean deleteRoleByID(@PathVariable int studentID, @PathVariable int roleID, HttpServletResponse res) {
		if (studentdao.destroyRole(studentID, roleID) == false) {
			res.setStatus(400);
			System.out.println("******************************************false");
			return false;
		} else {
			res.setStatus(200);
			System.out.println("******************************************true");
			return true;
		}
	}

	@RequestMapping(path="students/{studentID}/roles/{roleID}", method=RequestMethod.PUT)
	public Role updateRole(@PathVariable int studentID, @PathVariable int roleID, @RequestBody String roleJSON, HttpServletResponse res) {
		Role updatedRole = studentdao.updateRole(studentID, roleID, roleJSON);
		System.out.println("*******************" + updatedRole);
		if (updatedRole == null) {
			res.setStatus(400);
			return null;
		} else {
			res.setStatus(200);
			return updatedRole;
		}
	}
	
	@RequestMapping(path="students/roles", method=RequestMethod.GET)
	public Set<Student> indexStudentsByCurrentRole(HttpServletResponse res) {
		Set<Student> students = studentdao.getStudentsWithCurrentRole();
		if (students == null) {
			res.setStatus(400);
			return null;
		} else {
			res.setStatus(200);
			return students;
		}
	}
}

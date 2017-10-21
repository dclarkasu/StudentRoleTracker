package controllers;

import java.util.List;

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
		System.out.println("im hereeee");
		if (studentdao.showStudentById(id) == null) {
			res.setStatus(404);
			return null;
		} else {
			return studentdao.showStudentById(id);
		}
	}
	
	@RequestMapping(path="students", method=RequestMethod.POST)
	public Student create(@RequestBody String studentJSON, HttpServletResponse res) {
		if (studentdao.createNewStudent(studentJSON) == null) {
			res.setStatus(400);
			return null;
		} else {
			res.setStatus(200);
			return studentdao.createNewStudent(studentJSON);
		}
	}
	
	@RequestMapping(path="students/{id}", method=RequestMethod.PUT)
	public Student update(@PathVariable int id, @RequestBody String studentJSON, HttpServletResponse res) {
		if (studentdao.updateStudentById(id, studentJSON) == null) {
			res.setStatus(404);
			return null;
		} else {
			return studentdao.updateStudentById(id, studentJSON);
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
		if (studentdao.getAllRolesByStudentID(id) == null) {
			res.setStatus(400);
			return null;
		} else {
			res.setStatus(200);
			return studentdao.getAllRolesByStudentID(id);
		}
	}

	@RequestMapping(path="students/{id}/roles", method=RequestMethod.POST)
	public Role createNewRoleWithStudentID(@PathVariable int id, @RequestBody String roleJSON, HttpServletResponse res) {
		if (studentdao.createNewRole(id, roleJSON) == null) {
			res.setStatus(400);
			return null;
		} else {
			res.setStatus(200);
			return studentdao.createNewRole(id, roleJSON);
		}
	}

	@RequestMapping(path="students/{studentID}/roles/{roleID}", method=RequestMethod.DELETE)
	public boolean deleteRoleByID(@PathVariable int studentID, @PathVariable int roleID, HttpServletResponse res) {
		if (studentdao.destroyRole(studentID, roleID) == false) {
			res.setStatus(400);
			return false;
		} else {
			res.setStatus(200);
			return true;
		}
	}

	@RequestMapping(path="students/{studentID}/roles/{roleID}", method=RequestMethod.PUT)
	public Role updateRole(@PathVariable int studentID, @PathVariable int roleID, @RequestBody String roleJSON, HttpServletResponse res) {
		if (studentdao.updateRole(studentID, roleID, roleJSON) == null) {
			res.setStatus(400);
			return null;
		} else {
			res.setStatus(200);
			return studentdao.updateRole(studentID, roleID, roleJSON);
		}
	}
}

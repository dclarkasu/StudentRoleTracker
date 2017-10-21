package data;

import java.util.List;

import entities.Role;
import entities.Student;

public interface StudentDAO {
	
	public List<Student> getAllStudents();
	public Student showStudentById(int id);
	public Student createNewStudent(String studentJSON);
	public Student updateStudentById(int id, String studentJSON);
	public boolean destroyStudentById(int id);
	
	public List<Role> getAllRolesByStudentID(int id);
	public Role createNewRole(int id, String roleJSON);
	public Role updateRole(int studentID, int roleID, String roleJSON);
	public boolean destroyRole(int studentID, int roleID);

}

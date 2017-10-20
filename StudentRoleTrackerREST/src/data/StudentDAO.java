package data;

import java.util.List;

import entities.Student;

public interface StudentDAO {
	
	public List<Student> getAllStudents();
	public Student showStudentById(int id);
	public Student createNewStudent(String studentJSON);
	public Student updateStudentById(int id, String studentJSON);
	public boolean destroyStudentById(int id);

}

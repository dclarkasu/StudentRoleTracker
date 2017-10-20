package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import entities.Student;

@Transactional
@Repository
public class StudentDAOImpl implements StudentDAO {
	
	@PersistenceContext
	private EntityManager em;
	
	@Override
	public List<Student> getAllStudents() {
		String query ="SELECT s FROM Student s";
		return em.createQuery(query, Student.class).getResultList();
	}

	@Override
	public Student showStudentById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Student createNewStudent(String studentJSON) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Student updateStudentById(int id, String studentJSON) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean destroyStudentById(int id) {
		// TODO Auto-generated method stub
		return false;
	}
}


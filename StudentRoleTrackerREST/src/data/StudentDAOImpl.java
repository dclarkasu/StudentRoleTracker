package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Role;
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
		return em.find(Student.class, id);
	}

	@Override
	public Student createNewStudent(String studentJSON) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			Student mappedStud = mapper.readValue(studentJSON, Student.class);
			em.persist(mappedStud);
			em.flush();
			return mappedStud;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Student updateStudentById(int id, String studentJSON) {
		ObjectMapper mapper = new ObjectMapper();
		Student mappedStud = null;
		try {
			mappedStud = mapper.readValue(studentJSON, Student.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		Student s = em.find(Student.class, id);
		s.setFirstName(mappedStud.getFirstName());
		s.setLastName(mappedStud.getLastName());
		s.setGrade(mappedStud.getGrade());
		s.setRoles(mappedStud.getRoles());
		return s;
	}

	@Override
	public boolean destroyStudentById(int id) {
		Student s = em.find(Student.class, id);
		if (s != null && id > 0) {
			em.remove(s);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public List<Role> getAllRolesByStudentID(int id) {
	
		
		String query = "SELECT r FROM Role r WHERE r.student.id = :id";
		List<Role> result = em.createQuery(query, Role.class)
				.setParameter("id", id)
				.getResultList();
		return result;
	}

	@Override
	public Role createNewRole(int id, String roleJSON) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			Role mappedRole = mapper.readValue(roleJSON, Role.class);
			//query list or roles that has the same name as "mappedRole"
			//iterate over the list, setting each "isCurrent" to FALSE
			//persist new role with "isCurrent" to be true
			Student stud = em.find(Student.class, id);
			mappedRole.setStudent(stud);
			
			em.persist(mappedRole);
			em.flush();
			return mappedRole;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Role updateRole(int studentID, int roleID, String roleJSON) {
		
		//query for roles that have the same name
		ObjectMapper mapper = new ObjectMapper();
		try {
			Role mappedRole = mapper.readValue(roleJSON, Role.class);
			Student stud = em.find(Student.class, studentID);
			Role updateRole = null;
			
			for (int i = mappedRole.getId(); i < stud.getRoles().size(); i++) {
				if (stud.getRoles().get(i).getId() == i) {
					updateRole = stud.getRoles().get(i);
				}
			}
			updateRole.setName(mappedRole.getName());
			updateRole.setDescription(mappedRole.getDescription());
			updateRole.setStudent(mappedRole.getStudent());
			updateRole.setCurrent(false);
//			if (stud.getId() == mappedRole.getStudent().getId() && stud.getRoles()) {
//				stud.setRoles(stud.getRoles().get(roleID));
//			}
			return updateRole;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public boolean destroyRole(int studentID, int roleID) {
		Role role = em.find(Role.class, roleID);
		if (role.getStudent().getId() == studentID) {
			em.remove(role);
			return true;
		} else {
			return false;
		}
	}
}


package data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
		String query = "SELECT s FROM Student s";
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
		List<Role> result = em.createQuery(query, Role.class).setParameter("id", id).getResultList();
		return result;
	}

	@Override
	public Role createNewRole(int id, String roleJSON) {
		System.out.println("*********************");
		ObjectMapper mapper = new ObjectMapper();
		try {
			Role mappedRole = mapper.readValue(roleJSON, Role.class);
			Student stud = em.find(Student.class, id);
			//
			List<Role> roles = stud.getRoles();
			for (Role role : roles) {
				if (role.isCurrent() == true) {
					role.setCurrent(false); //Need to set current/previous role to false
				}
			}
			mappedRole.setStudent(stud);

			mappedRole.setCurrent(true);
			em.persist(mappedRole);//Still needs to be tested
			em.flush();
			return mappedRole;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Role updateRole(int studentID, int roleID, String roleJSON) {
		// query list or roles that has the same name as "mappedRole"
		// iterate over the list, setting each "isCurrent" to FALSE
		// persist new role with "isCurrent" to be true

		ObjectMapper mapper = new ObjectMapper();
		try {
			//mappedRole represents the new data passed in
			Role mappedRole = mapper.readValue(roleJSON, Role.class);
			String query = "Select r FROM Role r WHERE r.name = '" + mappedRole.getName() + "'";
			try {
				String studentQuery = "Select r FROM Role r WHERE r.name = '" + mappedRole.getName() + "' and r.isCurrent = true";
				//Role is the role pulled from the db to basically be copied but with new info
				Role role = em.createQuery(studentQuery, Role.class).getSingleResult();
				mappedRole.setStudent(role.getStudent());
				role.setCurrent(false);
				
				//Update just needs setters normally but we'll persist r because it's technically a new obj
				Role r = new Role();
				r.setName(role.getName());
				r.setDescription(mappedRole.getDescription());
				r.setStudent(mappedRole.getStudent());
				r.setCurrent(true);
				em.persist(r);
				em.flush();
				return r;
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public boolean destroyRole(int studentID, int roleID) {
		String query = "DELETE FROM Role WHERE id = :id";
		int result = em.createQuery(query).setParameter("id", roleID).executeUpdate();
		System.out.println("******************************************************");
		System.out.println(result);
		if (result > 0) {
			return true;
		} else {
			return false;
		}
//		Role role = em.find(Role.class, roleID);
//		if (role.getStudent().getId() == studentID) {
//			em.remove(role);
//			System.out.println("In Destroy Role True");
//			return true;
//		} else {
//			return false;
//		}
	}
	
	@Override
	public Set<Student> getStudentsWithCurrentRole() {
		// SELECT r.student FROM Role r WHERE r.isCurrent = true;
		String query = "SELECT r.student FROM Role r WHERE r.isCurrent = true";
		List<Student> students = em.createQuery(query, Student.class).getResultList();
		System.out.println("*******************************************************");
		System.out.println(students);
		return new HashSet<Student>(students);
	}
		
		//		String query2 = "SELECT s FROM Student s";
//		List<Student> studs = em.createQuery(query2, Student.class).getResultList();
//		System.out.println("********************************************");
//		System.out.println(studs);
//		Student s = new Student();
//		
//		
////		StudentDAOImpl studDAOImpl = new StudentDAOImpl();
////		List<Student> students = studDAOImpl.getAllStudents();
//		Role r;
//		
//		for (Integer id : ids) {
//			r = em.find(Role.class, id);
//			System.out.println("********************************************");
//			System.out.println(r);
//			for (int i = 0; i < studs.size(); i++) {
//				for (int j = 0; j < studs.get(i).getRoles().size(); j++) {
//					if (r.getId() == studs.get(i).getRoles().get(j).getId()) {
//						s = studs.get(i);
//						assignedStudents.add(s);
//					} else {
//						System.out.println("********************************************");
//						System.out.println("Student not added to isCurrent list");
//					}
//				}
//			}
//		}
//		return assignedStudents;
		
	
	//COULD create a list of all students and iterate over it chercking for those whose
	// id's don't match the above list and making the non mathcers into another list
	
	//Would write an ajax method for this new route to display on front end
	
}

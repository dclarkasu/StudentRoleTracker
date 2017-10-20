package test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Student;

public class StudentTest {
	private EntityManagerFactory emf = null;
	private EntityManager em = null;
	Student stud;
	
	@Before
	public void setUp() {
		emf = Persistence.createEntityManagerFactory("RoleTracker");
		em = emf.createEntityManager();
	}
	
	@After
	public void tearDown() {
		em.close();
		emf.close();

	}
	
	@Test
	public void test_Smoke() {
		boolean pass = true;
		assertEquals(pass, true);
	}
	
	@Test
	public void test_Student_Connected_to_DB() {
		stud = em.find(Student.class, 1);
		assertNotNull(stud.getFirstName(), "Lil Bobs");
		assertEquals(stud.getGrade(), "7th");
	}
	
	@Test
	public void test_Student_to_Role() {
		stud = em.find(Student.class, 1);
		assertEquals(stud.getRoles().get(0).getDescription(), "7th");
	}
	//Finds Quiz Entity then gets Question field to test on
//	@Test
//	public void test_Mapping_To_Question() {
//		stud = em.find(Student.class, 10);
//		assertNotNull(stud.getQuestions());
//		assertEquals(stud.getQuestions().size(), 5);
//	}
}

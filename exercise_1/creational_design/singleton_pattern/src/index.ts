import { HospitalManagement } from "./HospitalManagement";
import { Patient } from "./models/patient";

// Get singleton instance
const hospital = HospitalManagement.getInstance();

// Add patients
hospital.addPatient(new Patient(1, "John Doe", 30, "Flu"));
hospital.addPatient(new Patient(2, "Alice Brown", 25, "Cold"));

// Try to get another instance
const hospital2 = HospitalManagement.getInstance();
hospital2.addPatient(new Patient(3, "Mark Smith", 40, "Injury"));

// List all patients (same instance)
hospital.listPatients();

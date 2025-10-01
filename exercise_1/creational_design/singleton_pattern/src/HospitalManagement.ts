import { Patient } from "./models/patient";

export class HospitalManagement {
    private static instance: HospitalManagement;
    private patients: Patient[] = [];

    private constructor() { }

    public static getInstance(): HospitalManagement {
        if (!HospitalManagement.instance) {
            HospitalManagement.instance = new HospitalManagement();
        }
        return HospitalManagement.instance;
    }

    addPatient(patient: Patient) {
        this.patients.push(patient);
        console.log(`Patient ${patient.name} added.`);
    }

    listPatients() {
        console.log("Current Patients:");
        this.patients.forEach(p => {
            console.log(`ID: ${p.id}, Name: ${p.name}, Age: ${p.age}, Condition: ${p.condition}`);
        });
    }
}

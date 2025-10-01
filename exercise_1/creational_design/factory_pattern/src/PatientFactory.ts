// PatientFactory.ts
import { Inpatient, Outpatient, EmergencyPatient, PatientType } from "./models/PatientTypes";

export class PatientFactory {
    static createPatient(type: string, id: number, name: string, age: number, condition: string): PatientType {
        switch (type.toLowerCase()) {
            case "inpatient":
                return new Inpatient(id, name, age, condition);
            case "outpatient":
                return new Outpatient(id, name, age, condition);
            case "emergency":
                return new EmergencyPatient(id, name, age, condition);
            default:
                throw new Error("Invalid patient type");
        }
    }
}

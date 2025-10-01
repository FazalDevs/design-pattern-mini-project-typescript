// index.ts
import { PatientFactory } from "./PatientFactory";

const p1 = PatientFactory.createPatient("inpatient", 1, "Alice", 25, "Fever");
const p2 = PatientFactory.createPatient("outpatient", 2, "Bob", 30, "Checkup");
const p3 = PatientFactory.createPatient("emergency", 3, "Charlie", 40, "Accident");

console.log(p1.getDetails());
console.log(p2.getDetails());
console.log(p3.getDetails());

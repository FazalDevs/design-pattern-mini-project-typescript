// Ward.ts
import { PatientComponent } from "./PatientComponents";

export class Ward extends PatientComponent {
    private patients: PatientComponent[] = [];

    constructor(private name: string) {
        super();
    }

    add(patient: PatientComponent) {
        this.patients.push(patient);
    }

    remove(patient: PatientComponent) {
        this.patients = this.patients.filter(p => p !== patient);
    }

    checkVitals(): void {
        console.log(`Checking vitals for ward: ${this.name}`);
        this.patients.forEach(p => p.checkVitals());
    }
}

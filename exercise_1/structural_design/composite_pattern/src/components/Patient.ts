// Patient.ts
import { PatientComponent } from "./PatientComponents";

export class Patient extends PatientComponent {
    constructor(private name: string, private heartRate: number) {
        super();
    }

    checkVitals(): void {
        console.log(`Checking vitals for ${this.name}: Heart Rate = ${this.heartRate}`);
        if (this.heartRate < 60 || this.heartRate > 100) {
            console.log(`Alert: ${this.name}'s heart rate is abnormal!`);
        }
    }
}

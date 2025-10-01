import { Observer } from "./interfaces/Observer";
import { PatientVitals } from "./models/PatientVitals";

export class DoctorDashboard implements Observer {
    update(vitals: PatientVitals): void {
        console.log(`[DoctorDashboard] HeartRate: ${vitals.heartRate}, O2: ${vitals.oxygen}, Temp: ${vitals.temperature}`);
    }
}

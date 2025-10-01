import { Observer } from "./interfaces/Observer";
import { PatientVitals } from "./models/PatientVitals";

export class NurseStation implements Observer {
    update(vitals: PatientVitals): void {
        console.log(`[NurseStation] Monitoring patient vitals Oxygen: ${vitals.oxygen}%`);
    }
}

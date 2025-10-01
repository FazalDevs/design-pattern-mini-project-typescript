import { Observer } from "./interfaces/Observer";
import { PatientVitals } from "./models/PatientVitals";

export class EmergencyAlertSystem implements Observer {
    update(vitals: PatientVitals): void {
        if (vitals.oxygen < 90) {
            console.log(`[ALERT 🚨] Critical oxygen level detected: ${vitals.oxygen}%`);
        }
        if (vitals.heartRate > 120) {
            console.log(`[ALERT 🚨] High heart rate detected: ${vitals.heartRate} bpm`);
        }
        if (vitals.temperature > 39) {
            console.log(`[ALERT 🚨] High fever detected: ${vitals.temperature}°C`);
        }
    }
}

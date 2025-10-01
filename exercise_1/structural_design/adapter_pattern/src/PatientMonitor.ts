import { PatientVitals } from "./models/PatientVitals";

export class PatientMonitor {
    monitor(vitals: PatientVitals) {
        console.log(`Heart Rate: ${vitals.heartRate} bpm`);
        console.log(`Blood Pressure: ${vitals.bloodPressure}`);
        console.log(`Temperature: ${vitals.temperature} °F`);


        if (vitals.heartRate < 60 || vitals.heartRate > 100) {
            console.log("Alert: Heart rate abnormal!");
        }
        if (vitals.temperature > 100.4) {
            console.log("Alert: High temperature detected!");
        }
    }
}

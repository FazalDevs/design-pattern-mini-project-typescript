import { DeviceB } from "../devices/DeviceB";
import { PatientVitals } from "../models/PatientVitals";

export class DeviceBAdapter {
    private device: DeviceB;

    constructor(device: DeviceB) {
        this.device = device;
    }

    getPatientVitals(): PatientVitals {
        const data = this.device.fetchPatientData();
        return {
            heartRate: data.heartbeat,
            bloodPressure: data.bloodPressureReading,
            temperature: data.bodyTemp
        };
    }
}

import { DeviceA } from "../devices/DeviceA";
import { PatientVitals } from "../models/PatientVitals";

export class DeviceAAdapter {
    private device: DeviceA;

    constructor(device: DeviceA) {
        this.device = device;
    }

    getPatientVitals(): PatientVitals {
        const data = this.device.getVitals();
        return {
            heartRate: data.hr,
            bloodPressure: data.bp,
            temperature: data.temp
        };
    }
}

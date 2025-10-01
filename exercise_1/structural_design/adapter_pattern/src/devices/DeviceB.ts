export class DeviceB {
    // DeviceB provides vitals in a different format
    fetchPatientData() {
        return {
            heartbeat: 68,
            bloodPressureReading: "110/70",
            bodyTemp: 99.1
        };
    }
}

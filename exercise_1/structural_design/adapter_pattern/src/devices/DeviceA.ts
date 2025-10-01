export class DeviceA {
    // DeviceA provides vitals in its own format
    getVitals() {
        return {
            hr: 72,
            bp: "120/80",
            temp: 98.6
        };
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorDashboard = void 0;
class DoctorDashboard {
    update(vitals) {
        console.log(`[DoctorDashboard] HeartRate: ${vitals.heartRate}, O2: ${vitals.oxygen}, Temp: ${vitals.temperature}`);
    }
}
exports.DoctorDashboard = DoctorDashboard;

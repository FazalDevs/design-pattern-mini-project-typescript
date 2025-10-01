"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmergencyAlertSystem = void 0;
class EmergencyAlertSystem {
    update(vitals) {
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
exports.EmergencyAlertSystem = EmergencyAlertSystem;

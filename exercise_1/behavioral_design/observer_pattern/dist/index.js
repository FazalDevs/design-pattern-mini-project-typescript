"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PatientMonitor_1 = require("./PatientMonitor");
const DoctorDashboard_1 = require("./DoctorDashboard");
const NurseStation_1 = require("./NurseStation");
const EmergencyAlertSystem_1 = require("./EmergencyAlertSystem");
const monitor = new PatientMonitor_1.PatientMonitor();
const doctorDashboard = new DoctorDashboard_1.DoctorDashboard();
const nurseStation = new NurseStation_1.NurseStation();
const emergencySystem = new EmergencyAlertSystem_1.EmergencyAlertSystem();
// Register observers
monitor.attach(doctorDashboard);
monitor.attach(nurseStation);
monitor.attach(emergencySystem);
// Simulate updates
monitor.setVitals({ heartRate: 85, oxygen: 95, temperature: 37 });
monitor.setVitals({ heartRate: 130, oxygen: 88, temperature: 39.5 });
monitor.setVitals({ heartRate: 72, oxygen: 99, temperature: 36.8 });

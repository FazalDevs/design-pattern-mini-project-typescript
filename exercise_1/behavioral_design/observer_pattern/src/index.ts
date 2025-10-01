import { PatientMonitor } from "./PatientMonitor";
import { DoctorDashboard } from "./DoctorDashboard";
import { NurseStation } from "./NurseStation";
import { EmergencyAlertSystem } from "./EmergencyAlertSystem";

const monitor = new PatientMonitor();

const doctorDashboard = new DoctorDashboard();
const nurseStation = new NurseStation();
const emergencySystem = new EmergencyAlertSystem();

// Register observers
monitor.attach(doctorDashboard);
monitor.attach(nurseStation);
monitor.attach(emergencySystem);

// Simulate updates
monitor.setVitals({ heartRate: 85, oxygen: 95, temperature: 37 });
monitor.setVitals({ heartRate: 130, oxygen: 88, temperature: 39.5 });
monitor.setVitals({ heartRate: 72, oxygen: 99, temperature: 36.8 });

import { PatientMonitor } from "./PatientMonitor";
import { SMSAlert } from "./strategies/SmsAlert";
import { EmailAlert } from "./strategies/EmailAlert";
import { InAppAlert } from "./strategies/InApp";

const monitor = new PatientMonitor(new SMSAlert());
monitor.triggerAlert("John Doe", "Heart rate critical: 45 bpm");

monitor.setStrategy(new EmailAlert());
monitor.triggerAlert("Jane Smith", "Oxygen saturation critical: 82%");

monitor.setStrategy(new InAppAlert());
monitor.triggerAlert("Alice Brown", "Blood pressure high: 180/120 mmHg");

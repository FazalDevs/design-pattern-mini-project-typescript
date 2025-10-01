import { DeviceA } from "./devices/DeviceA";
import { DeviceB } from "./devices/DeviceB";
import { DeviceAAdapter } from "./adapters/DeviceAadapter";
import { DeviceBAdapter } from "./adapters/DeviceBAdapter";
import { PatientMonitor } from "./PatientMonitor";

const monitor = new PatientMonitor();

// Device A
const deviceA = new DeviceA();
const adapterA = new DeviceAAdapter(deviceA);
monitor.monitor(adapterA.getPatientVitals());

// Device B
const deviceB = new DeviceB();
const adapterB = new DeviceBAdapter(deviceB);
monitor.monitor(adapterB.getPatientVitals());

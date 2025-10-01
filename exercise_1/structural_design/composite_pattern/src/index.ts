// index.ts
import { Patient } from "./components/Patient";
import { Ward } from "./components/Ward";

const patient1 = new Patient("Alice", 72);
const patient2 = new Patient("Bob", 55);
const patient3 = new Patient("Charlie", 108);

const ward1 = new Ward("Ward A");
ward1.add(patient1);
ward1.add(patient2);

const ward2 = new Ward("Ward B");
ward2.add(patient3);

const hospital = new Ward("City Hospital");
hospital.add(ward1);
hospital.add(ward2);

hospital.checkVitals();

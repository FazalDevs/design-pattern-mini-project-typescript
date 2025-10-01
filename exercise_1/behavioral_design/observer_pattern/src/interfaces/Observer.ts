import { PatientVitals } from "../models/PatientVitals";

export interface Observer {
    update(vitals: PatientVitals): void;
}

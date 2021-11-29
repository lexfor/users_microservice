ALTER TABLE patients DROP CONSTRAINT patients_user_id_fkey;

ALTER TABLE doctors DROP CONSTRAINT doctors_user_id_fkey;

ALTER TABLE resolutions DROP CONSTRAINT resolutions_patient_id_fkey;

ALTER TABLE specializations ALTER COLUMN id TYPE UUID USING id::uuid;

ALTER TABLE doctor_specialization ALTER COLUMN doctor_id TYPE UUID USING doctor_id::uuid;

ALTER TABLE doctor_specialization ALTER COLUMN specialization_id TYPE UUID USING specialization_id::uuid;

ALTER TABLE doctors ALTER COLUMN id TYPE UUID USING id::uuid;

ALTER TABLE doctors ALTER COLUMN user_id TYPE UUID USING id::uuid;

ALTER TABLE patients ALTER COLUMN id TYPE UUID USING id::uuid;

ALTER TABLE patients ALTER COLUMN user_id TYPE UUID USING id::uuid;

ALTER TABLE resolutions ALTER COLUMN patient_id TYPE UUID USING id::uuid;

ALTER TABLE patients ADD CONSTRAINT patients_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE doctors ADD CONSTRAINT doctors_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE resolutions ADD CONSTRAINT resolutions_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES patients (id);
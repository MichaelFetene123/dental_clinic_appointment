import { z } from "zod";

export const appointmentPageSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    phoneNumber: z.string().min(10, 'Phone number is required'),
    email: z.string().email('Invalid email'),
    requestedDate: z.string().min(1, 'Date is required'),
    requestedTime: z.string().min(1, 'Time is required')
});

export const appointmentFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
    date: z.string().min(1, { message: "Date is required." }),
    time: z.string().min(1, { message: "Time is required." }),
    reason: z.string().min(5, { message: "Reason must be at least 5 characters." }),
    notes: z.string().optional(),
});

export const patientFormSchema = z.object({
    name: z.string().min(2, {
        message: "Full Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    password: z.string(),
    address: z.string(),
    role: z.enum(["ADMIN", "DOCTOR", "PATIENT", "RECEPTIONIST"]),
    phone: z.string(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    dateOfBirth: z.string(),
    bloodType: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "UNKNOWN"]),
    medicalHistory: z.string(),
    emergencyContactName: z.string(),
    emergencyContactPhone: z.string(),
    insuranceProvider: z.string(),
    insuranceNumber: z.string(),
    height: z.string(),
    weight: z.string(),
    bloodPressure: z.string(),
    heartRate: z.string(),
    bloodSugarLevel: z.string(),
    allergies: z.string(),
    medications: z.string(),
    chronicDiseases: z.string(),
    lastDentalVisit: z.string(),
    gumCondition: z.enum(["Healthy", "Gingivitis", "Periodontitis"]),
    toothDecay: z.string(),
    missingTeethCount: z.string(),
    prostheticsUsed: z.string(),
});

export const patientTableSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    header: z.string(),
    type: z.string(),
    status: z.string(),
    target: z.string(),
    limit: z.string(),
    reviewer: z.string(),
    phone: z.string(),
});


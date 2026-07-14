import { z } from "zod";

// ─── Public booking form (self-service, email required) ───────────────────────
export const appointmentPageSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    phoneNumber: z.string().min(10, 'Phone number is required'),
    email: z.string().email('Invalid email'),
    requestedDate: z.string().min(1, 'Date is required'),
    requestedTime: z.string().min(1, 'Time is required')
});

// ─── Admin appointment form (email optional for walk-ins) ─────────────────────
export const appointmentFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }).optional().or(z.literal("")),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
    date: z.string().min(1, { message: "Date is required." }),
    time: z.string().min(1, { message: "Time is required." }),
    reason: z.string().min(5, { message: "Reason must be at least 5 characters." }),
    notes: z.string().optional(),
});

// ─── Patient form (no longer requires a User account) ────────────────────────
export const patientFormSchema = z.object({
    name: z.string().min(2, {
        message: "Full Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }).optional().or(z.literal("")),
    phone: z.string(),
    address: z.string(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    dateOfBirth: z.string(),
    bloodType: z.enum(["A_PLUS", "A_MINUS", "B_PLUS", "B_MINUS", "O_PLUS", "O_MINUS", "AB_PLUS", "AB_MINUS", "UNKNOWN"]),
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
    gumCondition: z.enum(["HEALTHY", "GINGIVITIS", "PERIODONTITIS"]),
    toothDecay: z.string(),
    missingTeethCount: z.string(),
    prostheticsUsed: z.string(),
});


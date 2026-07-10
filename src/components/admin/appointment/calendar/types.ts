// ─── Shared types & constants for the appointment calendar ─────────────────────

export type AppointmentEntry = {
    id: string;
    date: Date;
    time: string;
    duration: number;
    patient: string;
    type: string;
    phone: string;
    email: string;
    notes: string;
};

export const APPOINTMENT_TYPES = {
    GENERAL: [
        { id: "checkup",  name: "Check-up",  duration: 30, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
        { id: "cleaning", name: "Cleaning",  duration: 45, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
        { id: "emergency",name: "Emergency", duration: 60, color: "bg-destructive/10 text-destructive" },
    ],
    TREATMENTS: [
        { id: "rootcanal",  name: "Root Canal",  duration: 90, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
        { id: "extraction", name: "Extraction",  duration: 60, color: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
        { id: "filling",    name: "Filling",     duration: 45, color: "bg-teal-500/10 text-teal-600 dark:text-teal-400" },
    ],
    ORTHODONTICS: [
        { id: "braces_adjustment", name: "Braces Adjustment", duration: 30, color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
        { id: "braces_fitting",    name: "Braces Fitting",    duration: 90, color: "bg-pink-100 text-pink-700" },
        { id: "retainer_check",    name: "Retainer Check",    duration: 20, color: "bg-yellow-100 text-yellow-700" },
    ],
} as const;

export const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour   = 8 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
});

export function getAppointmentTypeDetails(typeId: string) {
    return Object.values(APPOINTMENT_TYPES)
        .flat()
        .find((t) => t.id === typeId);
}

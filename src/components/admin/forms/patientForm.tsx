"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ClipboardIcon, PhoneCall, User } from "lucide-react";
import React, { useState, useRef, useActionState, useEffect } from "react";
import { format } from "date-fns";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { toast } from "sonner"
import { FaTooth } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { createPatient, updatePatient, type ActionResponse } from "@/lib/actions/mutations/patient-mutations";
import { parseISO, isValid } from "date-fns";
import type { PatientRow } from "@/lib/actions/queries/patient-queries";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PatientFormProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  patient?: PatientRow & {
    address?: string | null;
    dateOfBirth?: string | null;
    bloodType?: string | null;
    medicalHistory?: string | null;
    emergencyContactName?: string | null;
    emergencyContactPhone?: string | null;
    insuranceProvider?: string | null;
    insuranceNumber?: string | null;
    height?: string | null;
    weight?: string | null;
    bloodPressure?: string | null;
    heartRate?: string | null;
    bloodSugarLevel?: string | null;
    allergies?: string | null;
    medications?: string | null;
    chronicDiseases?: string | null;
    lastDentalVisit?: string | null;
    gumCondition?: string | null;
    toothDecay?: string | null;
    missingTeethCount?: string | null;
    prostheticsUsed?: string | null;
  };
}

const sections = [
  { title: "General Info", icon: <User size={24} /> },
  { title: "Medical History", icon: <ClipboardIcon size={24} /> },
  { title: "Emergency Contact", icon: <PhoneCall size={24} /> },
  { title: "Dental Info", icon: <FaTooth size={24} /> }
];

import { patientFormSchema as formSchema } from '@/lib/validationSchema';

// Step 0 only validates the 4 required fields. All other steps are optional.
const stepFields: Record<number, string[]> = {
  0: ["name", "phone", "gender", "dateOfBirth"],
  1: [],
  2: [],
  3: [],
};

type FormState = {
  errors?: Record<string, string>;
  success?: boolean;
};

function parseDateSafe(val?: string | null): Date | undefined {
  if (!val) return undefined;
  try {
    const d = parseISO(val);
    return isValid(d) ? d : undefined;
  } catch {
    return undefined;
  }
}

const PatientForm = ({ show, setShow, patient }: PatientFormProps) => {
  const [step, setStep] = useState(0);
  const [date, setDate] = React.useState<Date | undefined>(patient ? parseDateSafe(patient.dateOfBirth) : undefined);
  const [lastVisitDate, setLastVisitDate] = React.useState<Date | undefined>(patient ? parseDateSafe(patient.lastDentalVisit) : undefined);
  const [gender, setGender] = useState(patient?.gender ?? "");
  const [bloodType, setBloodType] = useState(patient?.bloodType ?? "UNKNOWN");
  const [gumCondition, setGumCondition] = useState(patient?.gumCondition ?? "HEALTHY");
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const queryClient = useQueryClient();

  const boundAction = React.useCallback(
    (prevState: ActionResponse, formData: FormData) => {
      if (patient) {
        return updatePatient(patient.id, prevState, formData);
      }
      return createPatient(prevState, formData);
    },
    [patient]
  );

  const [state, formAction, pending] = useActionState(boundAction, { success: false, error: "" });

  React.useEffect(() => {
    if (state?.success) {
      toast.success(patient ? "Patient updated successfully!" : "Patient created successfully!");
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
      if (patient) {
        queryClient.invalidateQueries({ queryKey: queryKeys.patients.detail(patient.id) });
      } else {
        queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
      }
      setShow(false);
    }
  }, [state?.success, queryClient, setShow, patient]);

  const validateCurrentStep = (): boolean => {
    if (!formRef.current) return false;

    const formData = new FormData(formRef.current);
    const errors: Record<string, string> = {};
    const fields = stepFields[step] || [];

    for (const field of fields) {
      const value = (formData.get(field) ?? "") as string;
      // Use zod shape to validate individual fields if possible
      const fieldSchema = formSchema.shape[field as keyof typeof formSchema.shape];
      if (fieldSchema) {
        const result = fieldSchema.safeParse(value);
        if (!result.success) {
          errors[field] = result.error.issues[0]?.message || "Invalid value";
        }
      }
    }

    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (step < sections.length - 1) {
      if (validateCurrentStep()) {
        setStep((prev) => Math.min(prev + 1, sections.length - 1));
      }
    } else {
      // On last step, submit the form
      formRef.current?.requestSubmit();
    }
  };

  const handlePrev = () => {
    setStepErrors({});
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const actionErrors = !state?.success ? state?.errors : undefined;
  const errors = { ...actionErrors, ...stepErrors };

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="w-full max-w-3xl max-h-[95vh] overflow-y-auto p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{patient ? "Edit Patient" : "Add New Patient"}</DialogTitle>
          <DialogDescription>
            {patient ? "Update patient information." : "Fill out the form to add a new patient."}
          </DialogDescription>
        </DialogHeader>

        <Card className="border-0 shadow-none">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{patient ? "Edit Patient" : "Add New Patient"}</CardTitle>
            </div>
          </CardHeader>
          <Separator />

          {/* Section Navigation */}
          <CardContent>
            <div className="relative flex justify-between mt-4 m-auto">
              {/* Line connecting all steps */}
              <div className="absolute top-4 left-20 w-[75%] mx-auto h-1 ">
                {/* Active Progress Line */}
                <div
                  className="h-1 bg-primary transition-all duration-300"
                  style={{ width: `${(step / (sections.length - 1)) * 100}%` }}
                ></div>
              </div>

              {/* Steps */}
              {sections.map((section, index) => (
                <div key={index} className="relative flex flex-col items-center gap-2 w-full">
                  {/* Step Circle */}
                  <div className="h-10 w-10 rounded-full bg-background flex justify-center items-center">
                    <div
                      className={`h-8 w-8 flex items-center justify-center rounded-full p-2 z-10 ${index <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {section.icon}
                    </div>
                  </div>

                  {/* Step Title */}
                  <span
                    className={`text-sm ${index <= step ? "font-bold text-primary" : "text-muted-foreground"
                      }`}
                  >
                    {section.title}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>

          {/* Form Sections */}
          <CardContent className={" overflow-y-auto"}>
            <form ref={formRef} action={formAction}>
              {/* Hidden inputs for controlled components */}
              <input type="hidden" name="gender" value={gender} />
              <input type="hidden" name="dateOfBirth" value={date ? format(date, "yyyy-MM-dd") : ""} />
              <input type="hidden" name="bloodType" value={bloodType} />
              <input type="hidden" name="lastDentalVisit" value={lastVisitDate ? format(lastVisitDate, "yyyy-MM-dd") : ""} />
              <input type="hidden" name="gumCondition" value={gumCondition} />

              <div className={cn("grid gap-4", step !== 0 && "hidden")}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field data-invalid={!!errors?.name}>
                      <FieldLabel htmlFor="name">Full Name <span className="text-destructive">*</span></FieldLabel>
                      <Input id="name" name="name" placeholder="Full Name" disabled={pending} defaultValue={patient?.name ?? ""} />
                      {errors?.name && <FieldError>{errors.name}</FieldError>}
                    </Field>
                    <Field data-invalid={!!errors?.email}>
                      <FieldLabel htmlFor="email">Email <span className="text-muted-foreground text-xs">(optional)</span></FieldLabel>
                      <Input id="email" name="email" placeholder="Email" disabled={pending} defaultValue={patient?.email !== "N/A" ? patient?.email : ""} />
                      {errors?.email && <FieldError>{errors.email}</FieldError>}
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field data-invalid={!!errors?.phone}>
                      <FieldLabel htmlFor="phone">Phone Number <span className="text-destructive">*</span></FieldLabel>
                      <Input id="phone" name="phone" placeholder="Phone Number" disabled={pending} defaultValue={patient?.phone !== "N/A" ? patient?.phone : ""} />
                      {errors?.phone && <FieldError>{errors.phone}</FieldError>}
                    </Field>
                    <Field data-invalid={!!errors?.address}>
                      <FieldLabel htmlFor="address">Address <span className="text-muted-foreground text-xs">(optional)</span></FieldLabel>
                      <Input id="address" name="address" placeholder="Address" disabled={pending} defaultValue={patient?.address ?? ""} />
                      {errors?.address && <FieldError>{errors.address}</FieldError>}
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field data-invalid={!!errors?.gender}>
                      <FieldLabel htmlFor="gender">Gender <span className="text-destructive">*</span></FieldLabel>
                      <Select onValueChange={(value) => setGender(value)} value={gender}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectItem value="FEMALE">Female</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors?.gender && <FieldError>{errors.gender}</FieldError>}
                    </Field>
                    <Field data-invalid={!!errors?.dateOfBirth}>
                      <FieldLabel htmlFor="dateOfBirth">Date of Birth <span className="text-destructive">*</span></FieldLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                          />
                        </PopoverContent>
                      </Popover>
                      {errors?.dateOfBirth && <FieldError>{errors.dateOfBirth}</FieldError>}
                    </Field>
                  </div>
                  <Field data-invalid={!!errors?.bloodType}>
                    <FieldLabel htmlFor="bloodType">Blood Type</FieldLabel>
                    <Select onValueChange={(value) => setBloodType(value)} defaultValue={bloodType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Blood Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A_PLUS">A+</SelectItem>
                        <SelectItem value="A_MINUS">A-</SelectItem>
                        <SelectItem value="B_PLUS">B+</SelectItem>
                        <SelectItem value="B_MINUS">B-</SelectItem>
                        <SelectItem value="O_PLUS">O+</SelectItem>
                        <SelectItem value="O_MINUS">O-</SelectItem>
                        <SelectItem value="AB_PLUS">AB+</SelectItem>
                        <SelectItem value="AB_MINUS">AB-</SelectItem>
                        <SelectItem value="UNKNOWN">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors?.bloodType && <FieldError>{errors.bloodType}</FieldError>}
                  </Field>
              </div>

              <div className={cn("grid gap-4", step !== 1 && "hidden")}>
                  <Field data-invalid={!!errors?.medicalHistory}>
                    <FieldLabel htmlFor="medicalHistory">Medical History</FieldLabel>
                    <Textarea id="medicalHistory" name="medicalHistory" placeholder="Medical History" disabled={pending} defaultValue={patient?.medicalHistory ?? ""} />
                    {errors?.medicalHistory && <FieldError>{errors.medicalHistory}</FieldError>}
                  </Field>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field data-invalid={!!errors?.height}>
                      <FieldLabel htmlFor="height">Height (cm)</FieldLabel>
                      <Input id="height" name="height" type="number" placeholder="Height (cm)" disabled={pending} defaultValue={patient?.height ?? ""} />
                      {errors?.height && <FieldError>{errors.height}</FieldError>}
                    </Field>
                    <Field data-invalid={!!errors?.weight}>
                      <FieldLabel htmlFor="weight">Weight (kg)</FieldLabel>
                      <Input id="weight" name="weight" type="number" placeholder="Weight (kg)" disabled={pending} defaultValue={patient?.weight ?? ""} />
                      {errors?.weight && <FieldError>{errors.weight}</FieldError>}
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field data-invalid={!!errors?.bloodPressure}>
                      <FieldLabel htmlFor="bloodPressure">Blood Pressure</FieldLabel>
                      <Input id="bloodPressure" name="bloodPressure" placeholder="e.g. 120/80" disabled={pending} defaultValue={patient?.bloodPressure ?? ""} />
                      {errors?.bloodPressure && <FieldError>{errors.bloodPressure}</FieldError>}
                    </Field>
                    <Field data-invalid={!!errors?.heartRate}>
                      <FieldLabel htmlFor="heartRate">Heart Rate (bpm)</FieldLabel>
                      <Input id="heartRate" name="heartRate" type="number" placeholder="Heart Rate (bpm)" disabled={pending} defaultValue={patient?.heartRate ?? ""} />
                      {errors?.heartRate && <FieldError>{errors.heartRate}</FieldError>}
                    </Field>
                  </div>

                  <Field data-invalid={!!errors?.bloodSugarLevel}>
                    <FieldLabel htmlFor="bloodSugarLevel">Blood Sugar Level</FieldLabel>
                    <Input id="bloodSugarLevel" name="bloodSugarLevel" type="number" placeholder="Blood Sugar Level" disabled={pending} defaultValue={patient?.bloodSugarLevel ?? ""} />
                    {errors?.bloodSugarLevel && <FieldError>{errors.bloodSugarLevel}</FieldError>}
                  </Field>

                  <Field data-invalid={!!errors?.allergies}>
                    <FieldLabel htmlFor="allergies">Allergies</FieldLabel>
                    <Textarea id="allergies" name="allergies" placeholder="Allergies" disabled={pending} defaultValue={patient?.allergies ?? ""} />
                    {errors?.allergies && <FieldError>{errors.allergies}</FieldError>}
                  </Field>

                  <Field data-invalid={!!errors?.medications}>
                    <FieldLabel htmlFor="medications">Medications</FieldLabel>
                    <Textarea id="medications" name="medications" placeholder="Medications" disabled={pending} defaultValue={patient?.medications ?? ""} />
                    {errors?.medications && <FieldError>{errors.medications}</FieldError>}
                  </Field>

                  <Field data-invalid={!!errors?.chronicDiseases}>
                    <FieldLabel htmlFor="chronicDiseases">Chronic Diseases</FieldLabel>
                    <Textarea id="chronicDiseases" name="chronicDiseases" placeholder="Chronic Diseases" disabled={pending} defaultValue={patient?.chronicDiseases ?? ""} />
                    {errors?.chronicDiseases && <FieldError>{errors.chronicDiseases}</FieldError>}
                  </Field>
              </div>

              <div className={cn("grid gap-4", step !== 2 && "hidden")}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field data-invalid={!!errors?.emergencyContactName}>
                      <FieldLabel htmlFor="emergencyContactName">Emergency Contact Name</FieldLabel>
                      <Input id="emergencyContactName" name="emergencyContactName" placeholder="Emergency Contact Name" disabled={pending} defaultValue={patient?.emergencyContactName ?? ""} />
                      {errors?.emergencyContactName && <FieldError>{errors.emergencyContactName}</FieldError>}
                    </Field>
                    <Field data-invalid={!!errors?.emergencyContactPhone}>
                      <FieldLabel htmlFor="emergencyContactPhone">Emergency Contact Phone</FieldLabel>
                      <Input id="emergencyContactPhone" name="emergencyContactPhone" type="tel" placeholder="Emergency Contact Phone" disabled={pending} defaultValue={patient?.emergencyContactPhone ?? ""} />
                      {errors?.emergencyContactPhone && <FieldError>{errors.emergencyContactPhone}</FieldError>}
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field data-invalid={!!errors?.insuranceProvider}>
                      <FieldLabel htmlFor="insuranceProvider">Insurance Provider</FieldLabel>
                      <Input id="insuranceProvider" name="insuranceProvider" placeholder="Insurance Provider" disabled={pending} defaultValue={patient?.insuranceProvider ?? ""} />
                      {errors?.insuranceProvider && <FieldError>{errors.insuranceProvider}</FieldError>}
                    </Field>
                    <Field data-invalid={!!errors?.insuranceNumber}>
                      <FieldLabel htmlFor="insuranceNumber">Insurance Number</FieldLabel>
                      <Input id="insuranceNumber" name="insuranceNumber" placeholder="Insurance Number" disabled={pending} defaultValue={patient?.insuranceNumber ?? ""} />
                      {errors?.insuranceNumber && <FieldError>{errors.insuranceNumber}</FieldError>}
                    </Field>
                  </div>
              </div>

              <div className={cn("grid gap-4", step !== 3 && "hidden")}>
                  <Field data-invalid={!!errors?.lastDentalVisit}>
                    <FieldLabel htmlFor="lastDentalVisit">Last Dental Visit</FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !lastVisitDate && "text-muted-foreground"
                          )}
                        >
                          {lastVisitDate ? format(lastVisitDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={lastVisitDate}
                          onSelect={setLastVisitDate}
                        />
                      </PopoverContent>
                    </Popover>
                    {errors?.lastDentalVisit && <FieldError>{errors.lastDentalVisit}</FieldError>}
                  </Field>

                  <Field data-invalid={!!errors?.gumCondition}>
                    <FieldLabel htmlFor="gumCondition">Gum Condition</FieldLabel>
                    <Select onValueChange={(value) => setGumCondition(value)} defaultValue={gumCondition}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gum Condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HEALTHY">Healthy</SelectItem>
                        <SelectItem value="GINGIVITIS">Gingivitis</SelectItem>
                        <SelectItem value="PERIODONTITIS">Periodontitis</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors?.gumCondition && <FieldError>{errors.gumCondition}</FieldError>}
                  </Field>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field data-invalid={!!errors?.toothDecay}>
                      <FieldLabel htmlFor="toothDecay">Tooth Decay (0-10)</FieldLabel>
                      <Input
                        id="toothDecay"
                        name="toothDecay"
                        type="number"
                        placeholder="Tooth Decay (0-10)"
                        min="0"
                        max="10"
                        disabled={pending}
                        defaultValue={patient?.toothDecay ?? ""}
                      />
                      {errors?.toothDecay && <FieldError>{errors.toothDecay}</FieldError>}
                    </Field>
                    <Field data-invalid={!!errors?.missingTeethCount}>
                      <FieldLabel htmlFor="missingTeethCount">Missing Teeth Count</FieldLabel>
                      <Input id="missingTeethCount" name="missingTeethCount" type="number" placeholder="Missing Teeth Count" disabled={pending} defaultValue={patient?.missingTeethCount ?? ""} />
                      {errors?.missingTeethCount && <FieldError>{errors.missingTeethCount}</FieldError>}
                    </Field>
                  </div>

                  <Field data-invalid={!!errors?.prostheticsUsed}>
                    <FieldLabel htmlFor="prostheticsUsed">Prosthetics Used</FieldLabel>
                    <Textarea id="prostheticsUsed" name="prostheticsUsed" placeholder="Prosthetics Used" disabled={pending} defaultValue={patient?.prostheticsUsed ?? ""} />
                    {errors?.prostheticsUsed && <FieldError>{errors.prostheticsUsed}</FieldError>}
                  </Field>
              </div>
            </form>
          </CardContent>
          {/* Navigation Buttons */}
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrev} disabled={step === 0}>
              Previous
            </Button>
            <Button onClick={handleNext} disabled={pending}>
              {step === sections.length - 1 ? (pending ? "Submitting..." : "Submit") : "Next"}
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default PatientForm;

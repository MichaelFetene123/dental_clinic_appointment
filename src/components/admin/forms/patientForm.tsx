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
import React, { useState, useRef, useActionState } from "react";
import { IoClose } from "react-icons/io5";
import { format } from "date-fns";
import { z } from "zod";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { toast } from "sonner"
import { FaTooth } from "react-icons/fa";

interface PatientFormProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const sections = [
  { title: "General Info", icon: <User size={24} /> },
  { title: "Medical History", icon: <ClipboardIcon size={24} /> },
  { title: "Emergency Contact", icon: <PhoneCall size={24} /> },
  { title: "Dental Info", icon: <FaTooth size={24} /> }
];

import { patientFormSchema as formSchema } from '@/lib/validationSchema';

// Fields required per step for validation
const stepFields: Record<number, string[]> = {
  0: ["name", "email", "phone", "address", "gender", "dateOfBirth", "bloodType"],
  1: ["medicalHistory", "height", "weight", "bloodPressure", "heartRate", "bloodSugarLevel", "allergies", "medications", "chronicDiseases"],
  2: ["emergencyContactName", "emergencyContactPhone", "insuranceProvider", "insuranceNumber"],
  3: ["lastDentalVisit", "gumCondition", "toothDecay", "missingTeethCount", "prostheticsUsed"],
};

type FormState = {
  errors?: Record<string, string>;
  success?: boolean;
};

const PatientForm = ({ show, setShow }: PatientFormProps) => {
  const [step, setStep] = useState(0);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [lastVisitDate, setLastVisitDate] = React.useState<Date | undefined>(new Date());
  const [gender, setGender] = useState("MALE");
  const [bloodType, setBloodType] = useState("UNKNOWN");
  const [gumCondition, setGumCondition] = useState("Healthy");
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function submitAction(_prevState: FormState, formData: FormData): Promise<FormState> {
    const rawData: Record<string, string> = {};
    formData.forEach((value, key) => {
      rawData[key] = value as string;
    });

    // Add defaults for fields not in form
    rawData.role = rawData.role || "PATIENT";
    rawData.password = rawData.password || "";

    const result = formSchema.safeParse(rawData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0] as string;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      }
      return { errors: fieldErrors };
    }

    console.log("Form submitted", result.data);
    toast.success("Patient submitted", {
      description: "The patient record has been saved successfully.",
    });
    return { success: true };
  }

  const [state, formAction, pending] = useActionState(submitAction, {} as FormState);

  const validateCurrentStep = (): boolean => {
    if (!formRef.current) return false;

    const formData = new FormData(formRef.current);
    const errors: Record<string, string> = {};
    const fields = stepFields[step] || [];

    for (const field of fields) {
      const value = formData.get(field) as string;
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

  // Merge step-level validation errors with action state errors
  const errors = { ...state?.errors, ...stepErrors };

  if (!show) return null;

  return (
    <div className="relative z-50">
      <div className="fixed inset-0 bg-black/50 z-40"></div>
      <Card className="mx-auto px-3 fixed top-0 right-0 mt-2 mr-3  z-50 shadow-lg bg-background w-full max-w-3xl max-h-screen overflow-y-scroll">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Add New Patient</CardTitle>
            <button
              className="text-muted-foreground hover:text-destructive transition "
              aria-label="Close form"
              onClick={() => setShow(false)}
            >
              <IoClose size={30} />
            </button>
          </div>
        </CardHeader>
        <Separator />

        {/* Section Navigation */}
        <CardContent>
          <div className="relative flex justify-between mt-4  m-auto">
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
                    className={`h-8 w-8  flex items-center justify-center rounded-full p-2 z-10 ${index <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
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
            <input type="hidden" name="role" value="PATIENT" />
            <input type="hidden" name="password" value="" />
            <input type="hidden" name="gender" value={gender} />
            <input type="hidden" name="dateOfBirth" value={date ? format(date, "yyyy-MM-dd") : ""} />
            <input type="hidden" name="bloodType" value={bloodType} />
            <input type="hidden" name="lastDentalVisit" value={lastVisitDate ? format(lastVisitDate, "yyyy-MM-dd") : ""} />
            <input type="hidden" name="gumCondition" value={gumCondition} />

            {step === 0 && (
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field data-invalid={!!errors?.name}>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input id="name" name="name" placeholder="Full Name" disabled={pending} />
                    {errors?.name && <FieldError>{errors.name}</FieldError>}
                  </Field>
                  <Field data-invalid={!!errors?.email}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" name="email" placeholder="Email" disabled={pending} />
                    {errors?.email && <FieldError>{errors.email}</FieldError>}
                  </Field>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field data-invalid={!!errors?.phone}>
                    <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                    <Input id="phone" name="phone" placeholder="Phone Number" disabled={pending} />
                    {errors?.phone && <FieldError>{errors.phone}</FieldError>}
                  </Field>
                  <Field data-invalid={!!errors?.address}>
                    <FieldLabel htmlFor="address">Address</FieldLabel>
                    <Input id="address" name="address" placeholder="Address" disabled={pending} />
                    {errors?.address && <FieldError>{errors.address}</FieldError>}
                  </Field>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field data-invalid={!!errors?.gender}>
                    <FieldLabel htmlFor="gender">Gender</FieldLabel>
                    <Select onValueChange={(value) => setGender(value)} defaultValue={gender}>
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
                    <FieldLabel htmlFor="dateOfBirth">Date of Birth</FieldLabel>
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
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="UNKNOWN">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors?.bloodType && <FieldError>{errors.bloodType}</FieldError>}
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-4">
                <Field data-invalid={!!errors?.medicalHistory}>
                  <FieldLabel htmlFor="medicalHistory">Medical History</FieldLabel>
                  <Textarea id="medicalHistory" name="medicalHistory" placeholder="Medical History" disabled={pending} />
                  {errors?.medicalHistory && <FieldError>{errors.medicalHistory}</FieldError>}
                </Field>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field data-invalid={!!errors?.height}>
                    <FieldLabel htmlFor="height">Height (cm)</FieldLabel>
                    <Input id="height" name="height" type="number" placeholder="Height (cm)" disabled={pending} />
                    {errors?.height && <FieldError>{errors.height}</FieldError>}
                  </Field>
                  <Field data-invalid={!!errors?.weight}>
                    <FieldLabel htmlFor="weight">Weight (kg)</FieldLabel>
                    <Input id="weight" name="weight" type="number" placeholder="Weight (kg)" disabled={pending} />
                    {errors?.weight && <FieldError>{errors.weight}</FieldError>}
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field data-invalid={!!errors?.bloodPressure}>
                    <FieldLabel htmlFor="bloodPressure">Blood Pressure</FieldLabel>
                    <Input id="bloodPressure" name="bloodPressure" placeholder="e.g. 120/80" disabled={pending} />
                    {errors?.bloodPressure && <FieldError>{errors.bloodPressure}</FieldError>}
                  </Field>
                  <Field data-invalid={!!errors?.heartRate}>
                    <FieldLabel htmlFor="heartRate">Heart Rate (bpm)</FieldLabel>
                    <Input id="heartRate" name="heartRate" type="number" placeholder="Heart Rate (bpm)" disabled={pending} />
                    {errors?.heartRate && <FieldError>{errors.heartRate}</FieldError>}
                  </Field>
                </div>

                <Field data-invalid={!!errors?.bloodSugarLevel}>
                  <FieldLabel htmlFor="bloodSugarLevel">Blood Sugar Level</FieldLabel>
                  <Input id="bloodSugarLevel" name="bloodSugarLevel" type="number" placeholder="Blood Sugar Level" disabled={pending} />
                  {errors?.bloodSugarLevel && <FieldError>{errors.bloodSugarLevel}</FieldError>}
                </Field>

                <Field data-invalid={!!errors?.allergies}>
                  <FieldLabel htmlFor="allergies">Allergies</FieldLabel>
                  <Textarea id="allergies" name="allergies" placeholder="Allergies" disabled={pending} />
                  {errors?.allergies && <FieldError>{errors.allergies}</FieldError>}
                </Field>

                <Field data-invalid={!!errors?.medications}>
                  <FieldLabel htmlFor="medications">Medications</FieldLabel>
                  <Textarea id="medications" name="medications" placeholder="Medications" disabled={pending} />
                  {errors?.medications && <FieldError>{errors.medications}</FieldError>}
                </Field>

                <Field data-invalid={!!errors?.chronicDiseases}>
                  <FieldLabel htmlFor="chronicDiseases">Chronic Diseases</FieldLabel>
                  <Textarea id="chronicDiseases" name="chronicDiseases" placeholder="Chronic Diseases" disabled={pending} />
                  {errors?.chronicDiseases && <FieldError>{errors.chronicDiseases}</FieldError>}
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field data-invalid={!!errors?.emergencyContactName}>
                    <FieldLabel htmlFor="emergencyContactName">Emergency Contact Name</FieldLabel>
                    <Input id="emergencyContactName" name="emergencyContactName" placeholder="Emergency Contact Name" disabled={pending} />
                    {errors?.emergencyContactName && <FieldError>{errors.emergencyContactName}</FieldError>}
                  </Field>
                  <Field data-invalid={!!errors?.emergencyContactPhone}>
                    <FieldLabel htmlFor="emergencyContactPhone">Emergency Contact Phone</FieldLabel>
                    <Input id="emergencyContactPhone" name="emergencyContactPhone" type="tel" placeholder="Emergency Contact Phone" disabled={pending} />
                    {errors?.emergencyContactPhone && <FieldError>{errors.emergencyContactPhone}</FieldError>}
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field data-invalid={!!errors?.insuranceProvider}>
                    <FieldLabel htmlFor="insuranceProvider">Insurance Provider</FieldLabel>
                    <Input id="insuranceProvider" name="insuranceProvider" placeholder="Insurance Provider" disabled={pending} />
                    {errors?.insuranceProvider && <FieldError>{errors.insuranceProvider}</FieldError>}
                  </Field>
                  <Field data-invalid={!!errors?.insuranceNumber}>
                    <FieldLabel htmlFor="insuranceNumber">Insurance Number</FieldLabel>
                    <Input id="insuranceNumber" name="insuranceNumber" placeholder="Insurance Number" disabled={pending} />
                    {errors?.insuranceNumber && <FieldError>{errors.insuranceNumber}</FieldError>}
                  </Field>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4">
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
                      <SelectItem value="Healthy">Healthy</SelectItem>
                      <SelectItem value="Gingivitis">Gingivitis</SelectItem>
                      <SelectItem value="Periodontitis">Periodontitis</SelectItem>
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
                    />
                    {errors?.toothDecay && <FieldError>{errors.toothDecay}</FieldError>}
                  </Field>
                  <Field data-invalid={!!errors?.missingTeethCount}>
                    <FieldLabel htmlFor="missingTeethCount">Missing Teeth Count</FieldLabel>
                    <Input id="missingTeethCount" name="missingTeethCount" type="number" placeholder="Missing Teeth Count" disabled={pending} />
                    {errors?.missingTeethCount && <FieldError>{errors.missingTeethCount}</FieldError>}
                  </Field>
                </div>

                <Field data-invalid={!!errors?.prostheticsUsed}>
                  <FieldLabel htmlFor="prostheticsUsed">Prosthetics Used</FieldLabel>
                  <Textarea id="prostheticsUsed" name="prostheticsUsed" placeholder="Prosthetics Used" disabled={pending} />
                  {errors?.prostheticsUsed && <FieldError>{errors.prostheticsUsed}</FieldError>}
                </Field>
              </div>
            )}
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
    </div>
  );
};

export default PatientForm;

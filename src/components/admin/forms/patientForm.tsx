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
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast"
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

const formSchema = z.object({
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

const PatientForm = ({ show, setShow }: PatientFormProps) => {
  const [step, setStep] = useState(0);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [lastVisitDate, setLastVisitDate] = React.useState<Date | undefined>(new Date());
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      address: "",
      role: "PATIENT", // Default role
      phone: "",
      gender: "MALE",
      dateOfBirth: "",
      bloodType: "UNKNOWN", // Default blood type
      medicalHistory: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      insuranceProvider: "",
      insuranceNumber: "",
      height: "",
      weight: "",
      bloodPressure: "",
      heartRate: "",
      bloodSugarLevel: "",
      allergies: "",
      medications: "",
      chronicDiseases: "",
      lastDentalVisit: "",
      gumCondition: "Healthy",
      toothDecay: "",
      missingTeethCount: "",
      prostheticsUsed: "",
    },
  });

  const handleNext = () => {
    form.handleSubmit((data) => {
      if (step < sections.length - 1) {
        setStep((prev) => Math.min(prev + 1, sections.length - 1));
      } else {
        console.log("Form submitted", data);
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }
    })();
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  if (!show) return null;

  return (
    <div className="relative z-50">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40"></div>
      <Card className="mx-auto px-3 fixed top-0 right-0 mt-2 mr-3  z-50 shadow-lg bg-white w-[800px] max-h-screen overflow-y-scroll">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Add New Patient</CardTitle>
            <button
              className="text-gray-600 hover:text-red-500 transition "
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
                className="h-1 bg-blue-600 transition-all duration-300"
                style={{ width: `${(step / (sections.length - 1)) * 100}%` }}
              ></div>
            </div>

            {/* Steps */}
            {sections.map((section, index) => (
              <div key={index} className="relative flex flex-col items-center gap-2 w-full">
                {/* Step Circle */}
                <div className="h-10 w-10 rounded-full bg-[#ffffff] flex justify-center items-center">
                  <div
                    className={`h-8 w-8  flex items-center justify-center rounded-full p-2 z-10 ${index <= step ? "bg-blue-600 text-white" : "bg-gray-400 text-white"
                      }`}
                  >
                    {section.icon}
                  </div>
                </div>

                {/* Step Title */}
                <span
                  className={`text-sm ${index <= step ? "font-bold text-blue-600" : "text-gray-500"
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
          <Form {...form}>
            {step === 0 && (
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="MALE">Male</SelectItem>
                            <SelectItem value="FEMALE">Female</SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={() => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
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
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Blood Type" />
                          </SelectTrigger>
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="medicalHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical History</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Medical History" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Height (cm)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Weight (kg)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="bloodPressure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blood Pressure</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 120/80" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="heartRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heart Rate (bpm)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Heart Rate (bpm)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="bloodSugarLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Sugar Level</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Blood Sugar Level" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="allergies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allergies</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Allergies" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="medications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medications</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Medications" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="chronicDiseases"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chronic Diseases</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Chronic Diseases" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="emergencyContactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Emergency Contact Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyContactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact Phone</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Emergency Contact Phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="insuranceProvider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insurance Provider</FormLabel>
                        <FormControl>
                          <Input placeholder="Insurance Provider" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="insuranceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insurance Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Insurance Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="lastDentalVisit"
                  render={() => (
                    <FormItem>
                      <FormLabel>Last Dental Visit</FormLabel>
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
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gumCondition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gum Condition</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Gum Condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Healthy">Healthy</SelectItem>
                          <SelectItem value="Gingivitis">Gingivitis</SelectItem>
                          <SelectItem value="Periodontitis">Periodontitis</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="toothDecay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tooth Decay (0-10)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Tooth Decay (0-10)"
                            min="0"
                            max="10"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="missingTeethCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Missing Teeth Count</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Missing Teeth Count" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="prostheticsUsed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prosthetics Used</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Prosthetics Used" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </Form>
        </CardContent>
        {/* Navigation Buttons */}
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrev} disabled={step === 0}>
            Previous
          </Button>
          <Button onClick={handleNext}>{step === sections.length - 1 ? "Submit" : "Next"}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PatientForm;

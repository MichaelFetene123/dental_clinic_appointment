"use client";

import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Calendar } from '@/components/ui/calendar';
import { z } from 'zod';
import { format } from 'date-fns';
import { useState, useEffect, useActionState } from 'react';
import { Badge } from "@/components/ui/badge"
import { PhoneInput } from "@/components/ui/phone-input";
import { axiosInstance } from '@/utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const formSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    phoneNumber: z.string().min(10, 'Phone number is required'),
    email: z.string().email('Invalid email'),
    requestedDate: z.string().min(1, 'Date is required'),
    requestedTime: z.string().min(1, 'Time is required')
});

type FormState = {
    errors?: Record<string, string>;
    success?: boolean;
};

const Page = () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const openTime = 2; // in 24h format (e.g., 14 for 2PM)
    const closeTime = 11; // in 24h format (e.g., 23 for 11PM)

    const rawTimeSlots = Array.from({ length: (closeTime - openTime) * 2 }, (_, i) => {
        const hour = openTime + Math.floor(i / 2);
        const minute = i % 2 === 0 ? '00' : '30';
        return `${hour.toString().padStart(2, '0')}:${minute}`; // Format as HH:mm
    });
    
    // Ensure all values are unique and trimmed
    const timeSlots = Array.from(new Set(rawTimeSlots.map(slot => slot.trim())));
    
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (showToast) {
            toast.success("You have successfully logged in.");
            setShowToast(false);
        }
    }, [showToast]);

    async function submitAction(_prevState: FormState, formData: FormData): Promise<FormState> {
        const rawData = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            phoneNumber: formData.get('phoneNumber') as string,
            email: formData.get('email') as string,
            requestedDate: formData.get('requestedDate') as string,
            requestedTime: formData.get('requestedTime') as string,
        };

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

        const formattedDate = rawData.requestedDate; // Already in yyyy-MM-dd format
        const formattedTime = rawData.requestedTime; // Already in HH:mm format

        const appointmentData = {
            ...result.data,
            requestedDate: formattedDate,
            requestedTime: formattedTime,
        };

        try {
            const response = await axiosInstance.post('/appointment/guest', appointmentData);
            console.log('Appointment booked successfully:', response.data);
            toast.success('Your appointment has been booked successfully.');
            return { success: true };
        } catch (error) {
            console.error('Error booking appointment:', error);
            toast.error('Failed to book your appointment. Please try again.');
            return { errors: { _form: 'Failed to book your appointment. Please try again.' } };
        }
    }

    const [state, formAction, pending] = useActionState(submitAction, {} as FormState);

    return (
        <Layout>
            <div className=' flex justify-center items-center'>
                <Card className='flex max-w-6xl justify-center items-center h-max my-28 relative'>
                    {/* <div className='bg-primary border-none rounded-none  shadow-none min-h-screen w-[30%] flex justify-center items-center'>
                        <Image 
                        src={"/images/logo/classic_logo.png"}
                        alt='logo'
                        width={300}
                        height={400}
                        />

                    </div> */}
                    <Card className='border-none w-[90%] shadow-none '>
                        <CardHeader>
                            <h1 className='text-2xl font-bold text-center'>Appointment</h1>
                            <p className='text-center text-sm text-muted-foreground'>You can book an appointment with us.</p>
                        </CardHeader>
                        <CardContent>
                            <form action={formAction} className='grid gap-4'>
                                <div className='grid md:grid-cols-2 gap-6'>
                                    <Field data-invalid={!!state?.errors?.firstName}>
                                        <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                                        <Input id="firstName" name="firstName" placeholder='Enter your first name' disabled={pending} />
                                        {state?.errors?.firstName && <FieldError>{state.errors.firstName}</FieldError>}
                                    </Field>
                                    <Field data-invalid={!!state?.errors?.lastName}>
                                        <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                                        <Input id="lastName" name="lastName" placeholder='Enter your last name' disabled={pending} />
                                        {state?.errors?.lastName && <FieldError>{state.errors.lastName}</FieldError>}
                                    </Field>

                                    <Field data-invalid={!!state?.errors?.phoneNumber}>
                                        <FieldLabel htmlFor="phoneNumber">Phone</FieldLabel>
                                        <PhoneInput
                                            id="phoneNumber"
                                            placeholder='Enter your phone number'
                                            value={phoneNumber}
                                            onChange={(value) => setPhoneNumber(value || '')}
                                            disabled={pending}
                                        />
                                        <input type="hidden" name="phoneNumber" value={phoneNumber} />
                                        {state?.errors?.phoneNumber && <FieldError>{state.errors.phoneNumber}</FieldError>}
                                    </Field>

                                    <Field data-invalid={!!state?.errors?.email}>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input id="email" name="email" type="email" placeholder='Enter your email' disabled={pending} />
                                        {state?.errors?.email && <FieldError>{state.errors.email}</FieldError>}
                                    </Field>
                                </div>

                                <Field data-invalid={!!state?.errors?.requestedDate} className='w-full flex flex-col justify-center'>
                                    <FieldLabel className='text-primary mt-3 self-center text-center text-lg font-subheading'>Pick your suitable date </FieldLabel>
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={(date) => {
                                            setSelectedDate(date);
                                        }}
                                        className="h-full w-full flex"
                                        classNames={{
                                            months: "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                                            month: "space-y-4 w-full flex flex-col",
                                            month_grid: "w-full h-full border-collapse space-y-1",
                                            week: "w-full mt-2",
                                        }}
                                    />
                                    <input type="hidden" name="requestedDate" value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''} />
                                    {state?.errors?.requestedDate && <FieldError>{state.errors.requestedDate}</FieldError>}
                                </Field>

                                <Field data-invalid={!!state?.errors?.requestedTime} className='w-full flex flex-col justify-center mb-10'>
                                    <FieldLabel className='text-primary self-center text-center text-lg font-subheading'>Pick available time </FieldLabel>
                                    <div className='flex flex-wrap gap-3 mb-10'>
                                        {timeSlots.map((slot, index) => (
                                            <Badge
                                                key={`time-slot-${index}`}
                                                variant={selectedTime === slot ? 'default' : 'outline'}
                                                onClick={() => setSelectedTime(slot)}
                                                className='cursor-pointer hover:bg-secondary hover:text-secondary-foreground font-normal text-base p-3'
                                            >
                                                {slot}
                                            </Badge>
                                        ))}
                                    </div>
                                    <input type="hidden" name="requestedTime" value={selectedTime} />
                                    {state?.errors?.requestedTime && <FieldError>{state.errors.requestedTime}</FieldError>}
                                </Field>

                                <Button type='submit' disabled={pending} className='w-full h-[60px] text-lg font-semibold'>
                                    {pending ? 'Booking...' : 'Book Now'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Card>
            </div>
            <ToastContainer />
        </Layout>
    );
};

export default Page;

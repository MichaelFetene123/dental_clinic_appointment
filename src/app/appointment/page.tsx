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

    // Local errors state to allow clearing errors on user input
    const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        setLocalErrors(state?.errors || {});
    }, [state?.errors]);

    // Clears the error for a specific field AND the general server error
    const clearError = (field: string) => {
        setLocalErrors(prev => {
            if (!prev[field] && !prev._form) return prev;
            const newErrors = { ...prev };
            delete newErrors[field];
            delete newErrors._form;
            return newErrors;
        });
    };

    return (
        <Layout>
            <div className=' flex justify-center items-center'>
                <Card className='flex max-w-6xl justify-center items-center h-max my-28 relative'>
                    <Card className='border-none w-[90%] shadow-none '>
                        <CardHeader>
                            <h1 className='text-2xl font-bold text-center'>Appointment</h1>
                            <p className='text-center text-sm text-muted-foreground'>You can book an appointment with us.</p>
                        </CardHeader>
                        <CardContent>
                            <form action={formAction} className='grid gap-4'>
                                {/* Display Global/Server Error if it exists */}
                                {localErrors?._form && (
                                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm text-center">
                                        {localErrors._form}
                                    </div>
                                )}

                                <div className='grid md:grid-cols-2 gap-6'>
                                    <Field data-invalid={!!localErrors?.firstName}>
                                        <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                                        <Input 
                                            id="firstName" 
                                            name="firstName" 
                                            placeholder='Enter your first name' 
                                            disabled={pending} 
                                            onChange={() => clearError('firstName')}
                                        />
                                        {localErrors?.firstName && <FieldError>{localErrors.firstName}</FieldError>}
                                    </Field>
                                    <Field data-invalid={!!localErrors?.lastName}>
                                        <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                                        <Input 
                                            id="lastName" 
                                            name="lastName" 
                                            placeholder='Enter your last name' 
                                            disabled={pending} 
                                            onChange={() => clearError('lastName')}
                                        />
                                        {localErrors?.lastName && <FieldError>{localErrors.lastName}</FieldError>}
                                    </Field>

                                    <Field data-invalid={!!localErrors?.phoneNumber}>
                                        <FieldLabel htmlFor="phoneNumber">Phone</FieldLabel>
                                        <PhoneInput
                                            id="phoneNumber"
                                            placeholder='Enter your phone number'
                                            value={phoneNumber}
                                            onChange={(value) => {
                                                setPhoneNumber(value || '');
                                                clearError('phoneNumber');
                                            }}
                                            disabled={pending}
                                        />
                                        <input type="hidden" name="phoneNumber" value={phoneNumber} />
                                        {localErrors?.phoneNumber && <FieldError>{localErrors.phoneNumber}</FieldError>}
                                    </Field>

                                    <Field data-invalid={!!localErrors?.email}>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input 
                                            id="email" 
                                            name="email" 
                                            type="email" 
                                            placeholder='Enter your email' 
                                            disabled={pending} 
                                            onChange={() => clearError('email')}
                                        />
                                        {localErrors?.email && <FieldError>{localErrors.email}</FieldError>}
                                    </Field>
                                </div>

                                <Field data-invalid={!!localErrors?.requestedDate} className='w-full flex flex-col justify-center'>
                                    <FieldLabel className='text-primary mt-3 self-center text-center text-lg font-subheading'>Pick your suitable date </FieldLabel>
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={(date) => {
                                            setSelectedDate(date);
                                            clearError('requestedDate');
                                        }}
                                        className="mx-auto rounded-lg border"
                                    />
                                    <input type="hidden" name="requestedDate" value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''} />
                                    {localErrors?.requestedDate && <FieldError>{localErrors.requestedDate}</FieldError>}
                                </Field>

                                <Field data-invalid={!!localErrors?.requestedTime} className='w-full flex flex-col justify-center mb-10'>
                                    <FieldLabel className='text-primary self-center text-center text-lg font-subheading'>Pick available time </FieldLabel>
                                    <div className='flex flex-wrap gap-3 mb-10'>
                                        {timeSlots.map((slot, index) => (
                                            <Badge
                                                key={`time-slot-${index}`}
                                                variant={selectedTime === slot ? 'default' : 'outline'}
                                                onClick={() => {
                                                    setSelectedTime(slot);
                                                    clearError('requestedTime');
                                                }}
                                                className='cursor-pointer hover:bg-secondary hover:text-secondary-foreground font-normal text-base p-3'
                                            >
                                                {slot}
                                            </Badge>
                                        ))}
                                    </div>
                                    <input type="hidden" name="requestedTime" value={selectedTime} />
                                    {localErrors?.requestedTime && <FieldError>{localErrors.requestedTime}</FieldError>}
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

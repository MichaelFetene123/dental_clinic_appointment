import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { ArrowUpRight, Cake, CalendarCheck, Home, Mail, Phone, VenusAndMars } from 'lucide-react'
import React from 'react'
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import DentalHistoryTable from './dentalHistory'
import MedicalDocument from './medicalDocument'
import DentalWellBeingChart from './DentalWellBeingChart'
import { format } from 'date-fns'

const PatientDetail = ({ patient }: { patient: any }) => {
  const appointmentCount = patient.appointments?.length ?? 0;
  const chartData = [
    { browser: "safari", visitors: appointmentCount, fill: "var(--color-safari)" },
  ];
  const chartConfig = {
    visitors: { label: "Visits" },
    safari: { label: "Appointments", color: "rgb(36,145,235)" },
  } satisfies ChartConfig;

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      <div className='grid grid-cols-1 gap-6 lg:col-span-2'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card className='max-h-[540px] flex flex-col'>
            <CardHeader>
              <CardTitle className='font-heading text-xl'>General Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex gap-3 mb-7 items-center'>
                <VenusAndMars />
                <div>
                  <p className='text-sm text-muted-foreground'>Gender</p>
                  <p>{patient.gender}</p>
                </div>
              </div>
              <div className='flex gap-3 mb-7 items-center'>
                <Cake />
                <div>
                  <p className='text-sm text-muted-foreground'>Birth date</p>
                  <p>{patient.dateOfBirth ? format(new Date(patient.dateOfBirth), 'MMM-dd-yyyy') : 'N/A'}</p>
                </div>
              </div>
              <div className='flex gap-3 mb-7 items-center'>
                <Phone />
                <div>
                  <p className='text-sm text-muted-foreground'>Phone Number</p>
                  <p>{patient.phone || 'N/A'}</p>
                </div>
              </div>
              <div className='flex gap-3 mb-7 items-center'>
                <Mail />
                <div>
                  <p className='text-sm text-muted-foreground'>Mail</p>
                  <p>{patient.email}</p>
                </div>
              </div>
              <div className="flex gap-3 mb-7 items-center">
                <Home />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p>{patient.address || 'N/A'}</p>
                </div>
              </div>
              <div className="flex gap-3 mb-7 items-center">
                <CalendarCheck />
                <div>
                  <p className="text-sm text-muted-foreground">Last Visit</p>
                  <p>{patient.lastDentalVisit ? format(new Date(patient.lastDentalVisit), 'MMM-dd-yyyy') : 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="max-h-[540px] relative overflow-hidden flex flex-col">
            <CardHeader>
              <CardTitle className="font-heading text-xl">Appointment Schedule</CardTitle>
            </CardHeader>
            <div className="relative px-2">
              <p className="absolute top-0 mt-2 left-[17px] h-[90%] border-2 border-dashed border-primary/40"></p>

              {patient.appointments.length === 0 && (
                <p className="text-sm text-muted-foreground px-4">No appointments found.</p>
              )}
              {patient.appointments.map((appt: any, index: number) => (
                <CardContent key={index} className={` ${index === patient.appointments.length - 1 ? "opacity-50" : ""}`}>
                  <div className="absolute left-[7px] flex items-center justify-center h-6 w-6 border-2 bg-background border-primary rounded-full">
                    <div className="h-4 w-4 bg-primary rounded-full"></div>
                  </div>
                  <p className="text-sm text-muted-foreground px-2 mb-1">{format(new Date(appt.date), 'MMM-dd-yyyy')} at {appt.time}</p>
                  <Card className='bg-primary text-primary-foreground'>
                    <CardHeader className='text-lg font-semibold'>
                      {appt.reason}
                      <p className="text-sm text-primary-foreground/70 font-normal">{appt.notes || "No additional notes."}</p>
                    </CardHeader>
                  </Card>
                </CardContent>
              ))}
            </div>

            {/* Fading overlay at the bottom */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
          </Card>
        </div>
        <div className='w-full'>
          <DentalHistoryTable history={patient.dentalHistory || []} />
        </div>

      </div>
      <div className='flex flex-col gap-6 lg:col-span-1'>
        <div>
          <Card className='pb-4'>
            <CardHeader>
              <CardTitle className='font-heading text-xl'>Member dentalical</CardTitle>
            </CardHeader>
            <div className='flex '>
              <CardContent className="flex-1 pb-0">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[150px]" // Decrease max height
                >
                  <RadialBarChart
                    data={chartData}
                    startAngle={-100}
                    endAngle={150}
                    innerRadius={60} // Decrease inner radius
                    outerRadius={100} // Decrease outer radius
                  >
                    <PolarGrid
                      gridType="circle"
                      radialLines={false}
                      stroke="none"
                      className="first:fill-muted last:fill-background"
                      polarRadius={[66, 54]} // Adjust grid size accordingly
                    />
                    <RadialBar dataKey="visitors" background cornerRadius={10} />
                    <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-3xl font-bold" // Decrease text size
                                >
                                  {chartData[0].visitors.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 20} // Adjust text spacing
                                  className="fill-muted-foreground text-sm"
                                >
                                  Visits
                                </tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </PolarRadiusAxis>
                  </RadialBarChart>
                </ChartContainer>
              </CardContent>
              <div className='flex-1 self-center mr-4'>
                <p className='text-muted-foreground'>Start date joined</p>
                <p className='font-semibold text-xl mb-3'>{patient.createdAt ? format(new Date(patient.createdAt), 'MMM d, yyyy') : 'N/A'}</p>
                <Button variant="outline" className='px-6 flex items-center font-semibold text-base'>
                  Extend <ArrowUpRight />
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <DentalWellBeingChart />
        <MedicalDocument documents={patient.medicalDocuments || []} />
      </div>
    </div>
  )
}

export default PatientDetail

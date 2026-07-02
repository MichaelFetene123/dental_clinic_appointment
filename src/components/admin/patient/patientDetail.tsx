import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { ArrowUpRight, Cake, CalendarCheck, Home, Mail, Phone, VenusAndMars } from 'lucide-react'
import React from 'react'
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import DentalHistoryTable from './dentalHistory'
import MedicalDocument from './medicalDocument'
import DentalWellBeingChart from './DentalWellBeingChart'

const chartData = [
  { browser: "safari", visitors: 23, fill: "var(--color-safari)" },
]
const chartConfig = {
  visitors: {
    label: "Days",
  },
  safari: {
    label: "Safari",
    color: "rgb(36,145,235)",
  },
} satisfies ChartConfig


const PatientDetail = () => {
  return (
    <div className='flex justify-between gap-5'>
      <div className='grid grid-cols-1 gap-3 w-[65%]'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          <Card className='max-h-[540px]'>
            <CardHeader>
              <p className='font-heading font-[600] text-xl '>General Information</p>
            </CardHeader>
            <CardContent>
              <div className='flex gap-3 mb-7 items-center'>
                <VenusAndMars />
                <div>
                  <p className='text-sm text-gray-500'>Gender</p>
                  <p>Male</p>
                </div>
              </div>
              <div className='flex gap-3 mb-7 items-center'>
                <Cake />
                <div>
                  <p className='text-sm text-gray-500'>Birth date</p>
                  <p>Jan-20-2000</p>
                </div>
              </div>
              <div className='flex gap-3 mb-7 items-center'>
                <Phone />
                <div>
                  <p className='text-sm text-gray-500'>Phone Number</p>
                  <p>096637523542</p>
                </div>
              </div>
              <div className='flex gap-3 mb-7 items-center'>
                <Mail />
                <div>
                  <p className='text-sm text-gray-500'>Mail</p>
                  <p>jhone@gmailcom</p>
                </div>
              </div>
              <div className="flex gap-3 mb-7 items-center">
                <Home />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p>1234 Elm St, Springfield</p>
                </div>
              </div>
              <div className="flex gap-3 mb-7 items-center">
                <CalendarCheck />
                <div>
                  <p className="text-sm text-gray-500">Last Visit</p>
                  <p>Feb-10-2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="max-h-[540px] relative overflow-hidden">
            <CardHeader  >
              <p className="font-heading font-[600] text-xl">Appointment Schedule</p>
            </CardHeader >
            <div className="relative px-2">
              <p className="absolute top-0 mt-2 left-[17px] h-[90%] border-2 border-dashed border-[#56a9ec]"></p>

              {[...Array(4)].map((_, index) => (
                <CardContent key={index} className={` ${index === 3 ? "opacity-50" : ""}`}>
                  <div className="absolute left-[7px] flex items-center justify-center h-6 w-6 border-2 bg-[#ffffff] border-[#2e92e3] rounded-full">
                    <div className="h-4 w-4 bg-[#2a91e6] rounded-full"></div>
                  </div>
                  <p className="text-sm text-gray-500 px-2 mb-1">Jan-20-2024</p>
                  <Card className='card-2 text-white'>
                    <CardHeader className='text-lg font-semibold'>
                      Brace treatment
                      <p className="text-sm text-gray-200 font-normal">Follow-up for braces adjustment.</p>
                    </CardHeader>
                  </Card>
                </CardContent>
              ))}
            </div>

            {/* Fading overlay at the bottom */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white via-white/70 to-transparent"></div>
          </Card>
        </div>
        <div className='w-full'>
          <DentalHistoryTable />
        </div>

      </div>
      <div className='flex flex-col gap-4 w-[34%]'>
        <div >
          <Card className='pb-4'>
            <CardHeader className='font-heading font-[600] text-xl pb-2'>
              Member dentalical
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
                                  Days
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
                <p className='text-gray-500'>Start date joined</p>
                <p className='font-semibold text-xl mb-3'>Jan 2 2025</p>
                <Button variant="outline" className='px-6 flex items-center font-semibold text-[17px]'>
                  Extend <ArrowUpRight />
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <DentalWellBeingChart />
        <MedicalDocument />
      </div>
    </div>
  )
}

export default PatientDetail
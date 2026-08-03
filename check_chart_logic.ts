import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env' });

async function main() {
    const { prisma } = require('./src/lib/prisma');
    
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    ninetyDaysAgo.setHours(0, 0, 0, 0);

    const recentPatients = await prisma.patient.findMany({
        where: { createdAt: { gte: ninetyDaysAgo } },
        select: { createdAt: true }
    });

    const recentAppointmentsForChart = await prisma.appointment.findMany({
        where: { date: { gte: ninetyDaysAgo } },
        select: { patientId: true, date: true, patient: { select: { createdAt: true } } }
    });

    const chartDataMap = new Map();
  
    for (let i = 0; i <= 90; i++) {
        const d = new Date(ninetyDaysAgo);
        d.setDate(d.getDate() + i);
        
        // Let's use local date string instead to avoid UTC shifting
        // padding with zeros to ensure YYYY-MM-DD
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        
        const monthStr = d.toLocaleString('default', { month: 'short' });
        chartDataMap.set(dateStr, { date: dateStr, month: monthStr, desktop: 0, mobile: 0 });
    }

    for (const p of recentPatients) {
        // Convert DB UTC createdAt to local string
        const d = p.createdAt;
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        
        if (chartDataMap.has(dateStr)) {
            chartDataMap.get(dateStr).desktop++;
        } else {
            console.log("MISSING KEY DESKTOP:", dateStr);
        }
    }

    const returningPatientsPerDay = new Map();
    for (const appt of recentAppointmentsForChart) {
        const apptDate = appt.date;
        const yearAppt = apptDate.getFullYear();
        const monthAppt = String(apptDate.getMonth() + 1).padStart(2, '0');
        const dayAppt = String(apptDate.getDate()).padStart(2, '0');
        const apptDateStr = `${yearAppt}-${monthAppt}-${dayAppt}`;

        const patDate = appt.patient.createdAt;
        const yearPat = patDate.getFullYear();
        const monthPat = String(patDate.getMonth() + 1).padStart(2, '0');
        const dayPat = String(patDate.getDate()).padStart(2, '0');
        const patientCreatedAtStr = `${yearPat}-${monthPat}-${dayPat}`;
        
        if (patientCreatedAtStr < apptDateStr) {
            if (!returningPatientsPerDay.has(apptDateStr)) {
                returningPatientsPerDay.set(apptDateStr, new Set());
            }
            returningPatientsPerDay.get(apptDateStr).add(appt.patientId);
        }
    }

    for (const [dateStr, patientsSet] of returningPatientsPerDay.entries()) {
        if (chartDataMap.has(dateStr)) {
            chartDataMap.get(dateStr).mobile = patientsSet.size;
        } else {
            console.log("MISSING KEY MOBILE:", dateStr);
        }
    }

    const chartData = Array.from(chartDataMap.values()).sort((a, b) => a.date.localeCompare(b.date));
    const nonZero = chartData.filter(d => d.desktop > 0 || d.mobile > 0);
    console.log("Non-zero chart entries:");
    console.log(JSON.stringify(nonZero, null, 2));
}

main().catch(console.error).finally(() => process.exit(0));

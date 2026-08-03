import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { User } from 'lucide-react';

export function GeneralInfoSkeleton() {
    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-4">
                <CardTitle className='text-lg flex items-center gap-2'>
                    <User className="w-5 h-5 text-primary" /> General Information
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <React.Fragment key={i}>
                        <div className="flex gap-3 items-start">
                            <Skeleton className="w-4 h-4 mt-0.5 rounded-full" />
                            <div className="space-y-1">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                        {i < 5 && <Separator />}
                    </React.Fragment>
                ))}
            </CardContent>
        </Card>
    )
}

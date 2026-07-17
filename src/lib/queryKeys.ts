export const queryKeys = {
  dashboard: {
    all: ['dashboard'] as const,
    stats: () => [...queryKeys.dashboard.all, 'stats'] as const,
  },
  appointments: {
    all: ['appointments'] as const,
    lists: () => [...queryKeys.appointments.all, 'list'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.appointments.lists(), { filters }] as const,
    details: () => [...queryKeys.appointments.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.appointments.details(), id] as const,
    calendar: (month: string) => [...queryKeys.appointments.all, 'calendar', month] as const,
  },
  patients: {
    all: ['patients'] as const,
    lists: () => [...queryKeys.patients.all, 'list'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.patients.lists(), { filters }] as const,
    details: () => [...queryKeys.patients.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.patients.details(), id] as const,
    history: (id: string) => [...queryKeys.patients.detail(id), 'history'] as const,
    documents: (id: string) => [...queryKeys.patients.detail(id), 'documents'] as const,
  },
  staff: {
    all: ['staff'] as const,
    lists: () => [...queryKeys.staff.all, 'list'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.staff.lists(), { filters }] as const,
  },
  profile: {
    all: ['profile'] as const,
    me: () => [...queryKeys.profile.all, 'me'] as const,
  },
};

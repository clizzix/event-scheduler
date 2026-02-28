import { z } from 'zod';

export const UserSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
});

export const LoginRequestSchema = z.object({
    email: z.email(),
    password: z.string().min(8), // API docs imply min length of 8
});

export const LoginResponseSchema = z.object({
    token: z.string(),
    user: z.object({
        id: z.number(),
        email: z.string().email(),
    }),
});

export const EventSchema = z.object({
    id: z.number(),
    title: z.string().min(3, 'Title is too short'),
    description: z.string().min(10, 'Description is too short'),
    date: z.string(),
    location: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    organizerId: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const CreateEventSchema = EventSchema.omit({
    id: true,
    organizerId: true,
    createdAt: true,
    updatedAt: true,
});

export const GetEventsResponseSchema = z.object({
    totalCount: z.number(),
    totalPages: z.number(),
    currentPage: z.number(),
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean(),
    results: z.array(EventSchema),
});

export type User = z.infer<typeof UserSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export type Event = z.infer<typeof EventSchema>;
export type CreateEventInput = z.infer<typeof CreateEventSchema>;
export type GetEventsResponse = z.infer<typeof GetEventsResponseSchema>;

import { User } from "@prisma/client";

export const userSelectableFields: (keyof User)[] = [
    'id',
    'name',
    'email',
    'role',
    'status',
    'address',
    'phone',
    'isVerified',
    'isDeleted',
    'createdAt',
    'updatedAt',
]


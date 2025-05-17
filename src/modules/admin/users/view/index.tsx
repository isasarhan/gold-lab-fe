'use client'
import Dropdown from '@/components/common/dropdown';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getRoleColor } from '@/lib/roleColors';
import { useUserContext } from '@/providers/UserProvider';
import useUsers from '@/services/users';
import { IUser, Role } from '@/types/user';
import { PhoneIcon, UserIcon, Mail } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { toast } from 'sonner';

export interface ViewUserModuleProps {
    user: IUser;
}

const ViewUserModule: FC<ViewUserModuleProps> = ({ user }) => {
    const { token } = useUserContext()
    const { update } = useUsers({ token })
    const router = useRouter()

    const handleChangeRole = async (role: Role | string) => {
        if (role === 'all') return
        await update(user._id!, { role }).then(() => {
            router.refresh()
            toast.success('updated!')
        })
    }
    return (
        <div className='flex flex-col gap-5'>
            <div className="flex flex-row gap-5">
                <Card className="w-full">
                    <CardHeader className='flex justify-center items-center'>
                        <Image src={'/images/profile.png'} width={150} height={150} alt='profile image'
                            className='rounded-full border shadow' />
                    </CardHeader>
                    <CardContent >
                        <div className='flex justify-center flex-col items-center gap-2'>
                            <p className='flex  items-center gap-3 text-xl'><UserIcon className='text-primary' />{user.name}</p>
                            <p className='flex items-center gap-3 text-xl'> <Mail className='text-primary' />{user.email}</p>
                            <p className='flex items-center gap-3 text-xl'><PhoneIcon className='text-primary' />{user.phone}</p>
                            <p className='flex items-center gap-3 text-xl'>
                                <Dropdown defaultvalue={user.role} placeholder='Select Rank' options={Object.values(Role).map((role) => {
                                    return { key: role, value: role, label: role }
                                })} handleDropdownChange={handleChangeRole} />
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                </Card>
            </div>
            <pre>

            </pre>

        </div>
    );
};

export default ViewUserModule;
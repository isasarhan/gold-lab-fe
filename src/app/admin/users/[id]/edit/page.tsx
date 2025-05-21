import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import EditUserModule from '@/modules/admin/users/edit';
import useUsers from '@/services/users';
import React, { FC } from 'react';

export interface EditUserPageProps {
    params: Promise<{ id: string }>

}

const fetchUser = async (id: string) => {
    const { token } = await getAuth();
    const { getById } = useUsers({ token: token })
    return await getById(id)
}



const EditUserPage: FC<EditUserPageProps> = async ({ params }) => {
    const { id } = await params;
    const user = await fetchUser(id)
    return (
        <>
            <Title text='Edit User' goBack={true}/>
            <EditUserModule user={user}/>
        </>
    );
};

export default EditUserPage;
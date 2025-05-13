import Title from "@/components/common/title";
import { getAuth } from "@/lib/auth";
import UsersModule from "@/modules/admin/users";
import useUsers from "@/services/users";
import React, { FC } from 'react';

export interface UsersPageProps {
    searchParams: Promise<{ query: string }>
}

const UsersPage: FC<UsersPageProps> = async ({ searchParams }) => {
    const { query } = await searchParams

    const { token, user } = await getAuth();

    const { getAll } = useUsers({ token })
    // const data = await getAll({ searchTerm:query });

    const data = await getAll({});

    return (
        <>
            <Title text='All Users' />
            <UsersModule users={data} />
        </>
    );
};

export default UsersPage;

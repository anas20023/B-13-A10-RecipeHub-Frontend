import { auth } from '@/app/lib/auth'
import { headers } from 'next/headers'
import React from 'react'

const UserDashboard = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return (
        <div>
            UserDashboard
        </div>
    )
}

export default UserDashboard

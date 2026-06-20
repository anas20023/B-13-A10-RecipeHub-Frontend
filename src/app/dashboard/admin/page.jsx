import { auth } from '@/app/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const AdminDashboard = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return (
        <div>
            AdminDashboard
        </div>
    )
}

export default AdminDashboard

'use client'

import { Spinner } from '@heroui/react'

export default function SectionLoading({
    label = 'Loading...',
    className = '',
}) {
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-background">
            <Spinner size="lg" color="warning" label={label} />
        </div>
    )
}

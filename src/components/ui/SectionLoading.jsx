'use client'

import { Spinner } from '@heroui/react'

export default function SectionLoading({
    label = 'Loading...',
    className = '',
}) {
    return (
        <div className={`flex items-center justify-center px-6 py-14 ${className}`.trim()}>
                <Spinner size="lg" color="warning" label={label} />
        </div>
    )
}

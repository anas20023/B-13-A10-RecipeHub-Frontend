import { Spinner } from '@heroui/react'
import React from 'react'

const loading = () => {
    return (
        <div className="flex flex-col h-screen items-center justify-center gap-2">
            <Spinner color="accent"  className='text-orange-500'/>
            {/* <span className="text-xs text-muted">Loading</span> */}
        </div>
    )
}

export default loading

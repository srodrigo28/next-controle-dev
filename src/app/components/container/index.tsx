import { ReactNode } from 'react'

export function Container( { children } : { children: ReactNode} ){
    return(
        <div className='bg-red-400 container max-w-7xl mx-auto mt-5'>
            {children}
        </div>
    )
}
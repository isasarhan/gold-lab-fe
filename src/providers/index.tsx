'use client'
import React, { ReactNode } from 'react'
import UserProvider from './UserProvider'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from './ThemeProvider'

interface ProvidersProps {
    children: ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <UserProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <Toaster />
                {children}
            </ThemeProvider>
        </UserProvider>
    )
}

export default Providers

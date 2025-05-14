'use client';

import { usePathname } from 'next/navigation';
import { SignedOut } from "@clerk/nextjs";
import Footer from './components/Footer';
import OuterHeader from './components/OuterHeader';

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const hideOuterHeader = pathname.startsWith('/interview');

    return (
        <>
            {!hideOuterHeader && (
                <SignedOut>
                    <OuterHeader />
                </SignedOut>
            )}
            {children}
            <Footer />
        </>
    );
}

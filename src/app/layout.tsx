import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/layout/Nav';

export const metadata: Metadata = {
    title: '꿈틀',
    description: 'Generated by create next app'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Nav />
                {children}
            </body>
        </html>
    );
}

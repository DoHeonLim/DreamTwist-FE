/**
File Name : Nav
Description : 네브바
Author : 나경윤

History
Date        Author   Status    Description
2024.07.21  나경윤    Created
*/

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import LoginNav from './LoginNav';

export default function Nav() {
    const pathname = usePathname();

    if (pathname === '/login') {
        return null;
    }

    return (
        <nav className="flex flex-row items-center justify-between px-24 py-3 text-lg shadow-md shadow-neutral-100">
            <Link href="/" className="cursor-pointer">
                <Image
                    src="/images/logo.svg"
                    alt="logo"
                    width={90}
                    height={0}
                />
            </Link>
            <div className="space-x-14 pt-1">
                <Link href="/" className="hover:text-main cursor-pointer">
                    동화 갤러리
                </Link>
                <Link
                    href="/buildstory"
                    className="hover:text-main cursor-pointer"
                >
                    동화 만들기
                </Link>
                <Link href="/" className="hover:text-main cursor-pointer">
                    꿈틀 가이드
                </Link>
            </div>
            <div className="pt-1 space-x-4">
                <Link
                    href="/login"
                    className="bg-main py-2 px-4 rounded-[7px] text-white cursor-pointer text-base"
                >
                    로그인
                </Link>
                {/* <LoginNav /> */}
            </div>
        </nav>
    );
}

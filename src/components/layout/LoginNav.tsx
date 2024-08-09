/**
File Name : LoginNav
Description : 로그인 후 네브바
Author : 나경윤

History
Date        Author   Status    Description
2024.08.06  나경윤    Created
*/

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import MyDropdown from '../auth/MyDropDown';
import { useDropdown } from '@/hooks/useDropdown';

interface UserInfo {
    nickname: string;
    profileImage: string;
}

export default function LoginNav({ userInfo }: { userInfo: UserInfo }) {
    const pathname = usePathname();
    const { isDropDown, dropdownRef, handleDropdown, setIsDropDown } =
        useDropdown();

    useEffect(() => {
        if (pathname === '/mypage') {
            setIsDropDown(false);
        }
    }, [pathname, setIsDropDown]);

    return (
        <div className="relative inline-block mt-1" ref={dropdownRef}>
            <div className="flex flex-row items-center">
                <p className="text-main mr-3 font-medium">
                    {userInfo.nickname}
                </p>
                <button
                    type="button"
                    className="relative inline-block"
                    onClick={handleDropdown}
                    style={{ width: 52, height: 52 }}
                >
                    {userInfo.profileImage && (
                        <Image
                            src={userInfo.profileImage}
                            alt="profile"
                            layout="fill"
                            className="object-cover rounded-full border border-gray-200"
                        />
                    )}
                </button>
            </div>
            {isDropDown && (
                <div className="absolute -right-6 top-full mt-2 z-50">
                    <MyDropdown />
                </div>
            )}
        </div>
    );
}

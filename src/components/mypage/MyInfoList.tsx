/**
File Name : mypage/MyInfoList
Description : 마이페이지 - 정보 리스트
Author : 나경윤

History
Date        Author   Status    Description
2024.08.07  나경윤    Created
2024.09.14  임도헌    Modified  반응형 UI 수정
*/

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getUserInfo } from '@/api/AuthApi';
import { LoadingIcon } from '../icons/LoadingIcon';
import { removeFromLocalStorage } from '@/utils/localStorage';

export default function MyInfoList() {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({
        nickname: '',
        profileImage: '',
        fairytaleCount: '',
        getLikesCount: '',
        points: ''
    });

    useEffect(() => {
        removeFromLocalStorage('title');
        removeFromLocalStorage('theme');
        removeFromLocalStorage('storys');
        removeFromLocalStorage('isPublic');
    }, []);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await getUserInfo();
                setUserInfo({
                    nickname: data.nickname,
                    profileImage: data.profileImage,
                    fairytaleCount: data.fairytaleCount,
                    getLikesCount: data.getLikesCount,
                    points: data.points
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 w-full">
                <div className="mx-24">
                    <LoadingIcon />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 xl:w-32 xl:h-32 self-end">
                <Image
                    src={userInfo.profileImage}
                    alt="profile"
                    fill
                    className="rounded-full border border-gray-200 object-cover"
                />
            </div>

            <div className="flex flex-col ml-4 sm:mx-4 md:mx-6 lg:mx-12 mt-1">
                <p className="text-sm lg:text-lg font-semibold">
                    안녕하세요,{' '}
                    <span className="text-main">{userInfo.nickname} </span>
                    작가님!
                </p>
                <div className="flex flex-row space-x-0.5 sm:space-x-2 md:space-x-4 lg:space-x-7 justify-center items-center mt-5 text-[12px] sm:text-sm md:text-md lg:text-lg">
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-medium">내 동화</p>
                        <p className="text-main font-semibold">
                            {userInfo.fairytaleCount}권
                        </p>
                    </div>
                    <div className="h-14 bg-gray-300" />
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-medium">받은 좋아요</p>
                        <p className="text-main font-semibold">
                            {userInfo.getLikesCount}
                        </p>
                    </div>
                    <div className="h-14 bg-gray-300" />
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-medium">내 나뭇잎</p>
                        <p className="text-main font-semibold">
                            {userInfo.points}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

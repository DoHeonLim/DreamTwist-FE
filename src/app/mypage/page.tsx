/**
File Name : mypage/page
Description : 마이페이지
Author : 나경윤

History
Date        Author   Status    Description
2024.08.02  나경윤    Created
2024.09.14  임도헌    Modified  반응형 UI 수정
*/

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MyBookList from '@/components/mypage/MyBookList';
import MyCommentList from '@/components/mypage/MyCommentList';
import MyPayList from '@/components/mypage/MyPayList';
import MyInfoList from '@/components/mypage/MyInfoList';
import LikeBookList from '@/components/mypage/LikeBookList';

export const metadata: Metadata = {
    title: '꿈틀 마이페이지',
    description: '나의 동화 목록과 정보를 확인하세요.'
};

export default async function Mypage() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-main-100 h-60 w-[90%] sm:w-[80%] mt-8 mb-4 md:mb-16 rounded-xl flex flex-col gap-y-2 sm:flex-row justify-center items-center px-2 sm:px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-44">
                <div className="flex flex-row items-center justify-center ">
                    <MyInfoList />
                </div>
                <div className="flex flex-row text-lg justify-center items-center">
                    <div className="w-px h-32 hidden md:flex bg-main mr-5" />
                    <div className="flex flex-row sm:flex-col text-[12px] ml-20 gap-x-2 sm:gap-x-0 sm:ml-0 sm:text-sm md:text-md lg:text-lg">
                        <Link href={'/edit-profile'}>
                            <div className="flex flex-row">
                                <Image
                                    src={'/images/profile.svg'}
                                    alt="profile-edit"
                                    width={22}
                                    height={0}
                                />
                                <p className="ml-3 mb-0.5 hover:text-main">
                                    프로필 수정
                                </p>
                            </div>
                        </Link>
                        <Link href={'/pay'}>
                            <div className="flex flex-row">
                                <Image
                                    src={'/images/credit.svg'}
                                    alt="profile-edit"
                                    width={22}
                                    height={0}
                                />
                                <p className="ml-3 hover:text-main">
                                    나뭇잎 충전
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mb-16 w-[80%]">
                <p className="text-[1.4rem] font-semibold">나의 동화</p>
                <MyBookList />
                <hr className="border-[0.5px] border-gray-300 opacity-30 w-full mt-12 -mb-4" />
                <p className="text-[1.4rem] font-semibold mt-16">
                    좋아요한 동화
                </p>
                <LikeBookList />
                <hr className="border-[0.5px] border-gray-300 opacity-30 w-full mt-12 -mb-4" />
                <div className="flex flex-col md:flex-row w-full space-x-8 lg:space-x-20 mt-6">
                    <div className="flex flex-col flex-1">
                        <p className="text-[1.4rem] font-semibold mt-4 lg:mt-16">
                            나의 댓글
                        </p>
                        <MyCommentList />
                    </div>
                    <div className="flex flex-col flex-1">
                        <p className="text-[1.4rem] font-semibold mt-4 lg:mt-16">
                            나의 결제 내역
                        </p>
                        <MyPayList />
                    </div>
                </div>
            </div>
        </div>
    );
}

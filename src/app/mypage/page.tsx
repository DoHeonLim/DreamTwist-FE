/**
File Name : mypage/page
Description : 마이페이지
Author : 나경윤

History
Date        Author   Status    Description
2024.08.02  나경윤    Created
*/

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MyBookList from '@/components/mypage/MyBookList';
import MyCommentList from '@/components/mypage/MyCommentList';
import { getMyPayList } from '@/api/MypageApi';
import { sampleImages } from '@/utils/dummyBooks';
import { dummyMyComments } from '@/utils/dummyBooks';
import { payInfo } from '@/types/mypage';
import MyPayList from '@/components/mypage/MyPayList';

export const metadata: Metadata = {
    title: '꿈틀 마이페이지',
    description: '나의 동화 목록과 정보를 확인하세요.'
};

export default async function Mypage() {
    const coverImage = sampleImages;

    const myCommentInfo = dummyMyComments.map((item) => {
        return { ...item };
    });

    const payData = await getMyPayList('2');

    // const payInfo = payData
    //     ? payData.map(
    //           ({ id, amount, method, order_name, isRefundable }: payInfo) => ({
    //               id,
    //               amount,
    //               method,
    //               order_name,
    //               isRefundable
    //           })
    //       )
    //     : [];

    // console.log(payData);

    return (
        <div className="flex flex-col justify-center items-center mx-24 mt-16 mb-7">
            <div className="bg-main-100 h-64 w-full mb-16 rounded-xl flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-44">
                <div className="flex flex-row">
                    <Image
                        src={'/images/default-profile.svg'}
                        alt="profile"
                        width={125}
                        height={0}
                    />
                    <div className="flex flex-col mx-12 mt-1">
                        <p className="text-[1.7rem] font-semibold">
                            안녕하세요, <span className="text-main">민규</span>{' '}
                            작가님!
                        </p>
                        <div className="flex flex-row space-x-7 justify-center items-center mt-5">
                            <div className="flex flex-col justify-center items-center text-lg">
                                <p className="font-medium">내 동화</p>
                                <p className="text-main font-semibold">3권</p>
                            </div>
                            <div className="w-px h-14 bg-gray-300" />
                            <div className="flex flex-col justify-center items-center text-lg">
                                <p className="font-medium">받은 좋아요</p>
                                <p className="text-main font-semibold">356</p>
                            </div>
                            <div className="w-px h-14 bg-gray-300" />
                            <div className="flex flex-col justify-center items-center text-lg">
                                <p className="font-medium">포인트</p>
                                <p className="text-main font-semibold">500</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row text-lg justify-center items-center ml-28 mt-16">
                    <div className="w-px h-14 bg-main mr-5" />
                    <div className="flex flex-col">
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
                        <Link href={'/payments'}>
                            <div className="flex flex-row">
                                <Image
                                    src={'/images/credit.svg'}
                                    alt="profile-edit"
                                    width={22}
                                    height={0}
                                />
                                <p className="ml-3 hover:text-main">
                                    포인트 충전
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col self-start mb-16 w-full">
                <p className="text-[1.3rem] font-semibold">나의 동화</p>
                <MyBookList bookInfo={coverImage} />
                <p className="text-[1.3rem] font-semibold mt-16">
                    좋아요한 동화
                </p>
                <MyBookList bookInfo={coverImage} />
                <div className="flex flex-row w-full space-x-20 mt-6">
                    <div className="flex flex-col flex-1">
                        <p className="text-[1.3rem] font-semibold mt-16">
                            나의 댓글
                        </p>
                        <MyCommentList commentInfo={myCommentInfo} />
                    </div>
                    <div className="flex flex-col flex-1">
                        <p className="text-[1.3rem] font-semibold mt-16">
                            나의 결제 내역
                        </p>
                        {/* <MyPayList payInfo={payInfo} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

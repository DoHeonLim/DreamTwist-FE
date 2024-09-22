/**
File Name : main/BestBook
Description : 메인 - 베스트 동화
Author : 나경윤

History
Date        Author   Status    Description
2024.08.12  나경윤    Created
2024.09.14  임도헌    Modified  반응형 UI 수정
*/

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FairytaleInfo } from '@/types/fairytale';
import { getSearchBook } from '@/api/MainApi';

export default function BestBook() {
    const router = useRouter();
    const [bestBooks, setBestBooks] = useState<FairytaleInfo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let query = `?sortOrder=인기순&tags=모든 주제`;

            try {
                const result = await getSearchBook(query);
                const formattedResult = result.map((item: FairytaleInfo) => ({
                    ...item,
                    createdAt: item.createdAt.split('T')[0]
                }));

                const bestResult = formattedResult.slice(0, 3);
                setBestBooks(bestResult);

                // console.log('인기조회', bestResult);
            } catch (error) {
                console.error(error);
                setBestBooks([]);
            }
        };

        fetchData();
    }, []);

    const handleBookClick = (id: number) => {
        router.push(`/board/${id}`);
    };

    return (
        <div className="flex flex-col mb-10 border-t-2 border-gray-300 border-opacity-50 w-full h-full justify-center items-center pb-6 pt-10">
            {/* 데이터 없을 때 */}
            {bestBooks.length === 0 && (
                <div className="flex flex-col justify-center items-center my-20">
                    <p className="text-center text-gray-500">
                        등록된 동화가 없습니다.
                    </p>
                </div>
            )}

            {/* 데이터 있을 때 */}
            {bestBooks.length > 0 && (
                <div className="flex flex-col lg:flex-row space-y-4 md:gap-x-6">
                    <div className="flex flex-col lg:flex-row space-y-4 md:gap-x-6 justify-center items-center">
                        {bestBooks.map((item) => (
                            <button
                                type="button"
                                key={item.fairytaleId}
                                onClick={() =>
                                    handleBookClick(item.fairytaleId)
                                }
                                className="relative w-[13rem] aspect-[6/7] border border-gray-200 overflow-hidden rounded-xl bg-white transition-transform animate-scaleIn"
                            >
                                <div
                                    className="absolute top-0 w-full h-full overflow-hidden"
                                    style={{
                                        backgroundImage: `url(${item.coverImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'top',
                                        height: '90%'
                                    }}
                                />
                                <Image
                                    src={'/images/award.svg'}
                                    alt="award-icon"
                                    width={30}
                                    height={0}
                                    className="absolute top-2 left-2"
                                />
                                <div className="absolute bg-white bottom-0 w-full text-left py-1.5 pl-4">
                                    <p className="text-[1rem] font-semibold truncate">
                                        {item.title}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[0.9rem] flex-grow truncate pr-4">
                                            {item.nickname} 작가
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-col mt-6 md:mt-0 md:ml-4 w-[300px]">
                        <p className="flex justify-center text-[1.2rem] text-left mb-6 mt-4 ml-1 text-main font-semibold">
                            BEST 꿈틀 작가
                        </p>

                        <div className="flex flex-col space-y-4 ml-1">
                            {bestBooks.map((item) => (
                                <div className="flex flex-col">
                                    <div className="flex flex-row items-center">
                                        <Image
                                            src={'/images/crown.svg'}
                                            alt="star-icon"
                                            width={20}
                                            height={0}
                                            className="mr-2"
                                        />
                                        <p className="text-[1rem] truncate">
                                            {item.nickname} 작가
                                        </p>
                                    </div>
                                    <hr className="w-[100%] md:w-[80%] border-[0.1rem] border-main-200 opacity-70 my-1.5 rounded-xl" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

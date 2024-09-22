/**
File Name : mypage/MyBookList
Description : 마이페이지 동화 리스트 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.08.03  나경윤    Created
2024.09.14  임도헌    Modified  반응형 UI 수정
*/

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMyBookList } from '@/api/MypageApi';

interface BookProps {
    coverImage: string;
    createdAt: string;
    title: string;
    id: number;
}

export default function MyBookList() {
    const router = useRouter();
    const [bookCount, setBookCount] = useState(5);
    const [viewClick, setViewClick] = useState(false);
    const [myBooks, setMyBooks] = useState<BookProps[]>([]);

    useEffect(() => {
        const fetchMyBook = async () => {
            try {
                const data = await getMyBookList();
                const myBookData = data.myFairytales.map((item: BookProps) => ({
                    ...item,
                    createdAt: item.createdAt.split('T')[0]
                }));

                setMyBooks(myBookData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMyBook();
    }, []);

    const handleLoadMore = () => {
        viewClick ? setBookCount(5) : setBookCount(myBooks.length);
        setViewClick(!viewClick);
    };

    return (
        <div className="flex flex-col justify-between mt-6">
            {myBooks.length === 0 ? (
                <p className="text-center text-gray-500 my-20 text-[1rem]">
                    동화가 없습니다.
                </p>
            ) : (
                <>
                    <div className="grid place-items-center md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8 w-full">
                        {myBooks.slice(0, bookCount).map((item) => (
                            <button
                                type="button"
                                key={item.id}
                                onClick={() => router.push(`/board/${item.id}`)}
                                className="relative w-full aspect-[4/5] border rounded-lg border-gray-200 overflow-hidden"
                            >
                                <div
                                    className="absolute top-0 w-full h-full overflow-hidden"
                                    style={{
                                        backgroundImage: `url(${item.coverImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'top',
                                        height: '82%'
                                    }}
                                />
                                <div className="absolute bg-white bottom-0 w-full py-2 text-left pl-4">
                                    <div className="flex flex-col">
                                        <p className="text-[1.2rem] font-medium mb-0.5 truncate">
                                            {item.title}
                                        </p>
                                        <p className="text-[0.7rem] text-gray-400">
                                            {item.createdAt}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                    {myBooks.length > 5 && (
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={handleLoadMore}
                                className={`mt-10 w-24 h-[2.1rem] ${viewClick ? 'bg-main-200' : 'bg-main'} text-white rounded-3xl text-[0.95rem]`}
                            >
                                {viewClick ? '접기' : '전체 보기'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

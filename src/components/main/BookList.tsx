/**
File Name : main/BookList
Description : 메인 북 리스트 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.22  나경윤    Created
2024.07.23  나경윤    Modified  무한 스크롤 추가
2024.09.13  임도헌    Modified  반응형 UI로 변경
*/

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { FairytaleInfo } from '@/types/fairytale';

interface BookListProps {
    fairytaleInfo: FairytaleInfo[];
}

const itemsPerPage: number = 8;

export default function BookList({ fairytaleInfo }: BookListProps) {
    const router = useRouter();
    const [items, setItems] = useState<FairytaleInfo[]>([]);
    const pageIndexRef = useRef<number>(1);
    const [isEnd, setIsEnd] = useState<boolean>(false);

    useEffect(() => {
        setItems(fairytaleInfo.slice(0, itemsPerPage));
        pageIndexRef.current = 2;
        setIsEnd(false);
    }, [fairytaleInfo]);

    useEffect(() => {
        const savedItems = sessionStorage.getItem('BOOKLIST_ITEMS');
        const savedPageIndex = sessionStorage.getItem('BOOKLIST_PAGE_INDEX');
        const savedScrollY = sessionStorage.getItem('BOOKLIST_SCROLL_Y');
        const isReturningFromBook = sessionStorage.getItem(
            'IS_RETURNING_FROM_BOOK'
        );

        if (savedItems && savedPageIndex && isReturningFromBook === 'true') {
            // 버튼 클릭 후 뒤로가기에서 돌아온 경우에만 복원
            setItems(JSON.parse(savedItems));
            pageIndexRef.current = Number(savedPageIndex);
            setTimeout(() => {
                window.scrollTo(0, Number(savedScrollY));
            }, 0);
            // 복원 후 상태 초기화
            sessionStorage.removeItem('IS_RETURNING_FROM_BOOK');
        } else {
            // 처음 페이지 로드 시
            setItems(fairytaleInfo.slice(0, itemsPerPage));
            pageIndexRef.current = 2;
            setIsEnd(false);
        }
    }, []);

    const loadItems = () => {
        if (isEnd) return; // 페이지 끝에 도달한 경우 추가 로드 방지

        const newItems = fairytaleInfo.slice(
            (pageIndexRef.current - 1) * itemsPerPage,
            pageIndexRef.current * itemsPerPage
        );

        if (newItems.length < itemsPerPage) {
            setIsEnd(true); // 데이터가 부족할 경우 페이지 끝 상태 설정
        }

        setItems((prev) => [...prev, ...newItems]);
        pageIndexRef.current++;
    };

    const handleBookClick = (id: number) => {
        // 현재 상태 저장
        sessionStorage.setItem('BOOKLIST_ITEMS', JSON.stringify(items));
        sessionStorage.setItem(
            'BOOKLIST_PAGE_INDEX',
            `${pageIndexRef.current}`
        );
        sessionStorage.setItem('BOOKLIST_SCROLL_Y', `${window.scrollY}`);
        sessionStorage.setItem('IS_RETURNING_FROM_BOOK', 'true');

        // 페이지 이동
        router.push(`/board/${id}`);
    };

    const { ref } = useInfiniteScroll({
        onLoadMore: loadItems
    });

    return (
        <div className="flex flex-col">
            {/* 데이터 없을 때 */}
            {fairytaleInfo.length === 0 && (
                <div className="flex flex-col justify-center items-center my-20">
                    <p className="text-center text-gray-500">
                        등록된 동화가 없습니다.
                    </p>
                </div>
            )}

            {/* 데이터 있을 때 */}
            {fairytaleInfo.length > 0 && (
                <>
                    <div className="grid place-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-y-12 gap-x-8 my-10 z-0">
                        {items.map((item) => (
                            <button
                                type="button"
                                key={item.fairytaleId}
                                onClick={() =>
                                    handleBookClick(item.fairytaleId)
                                }
                                className="relative max-w-[20rem] w-[250px] sm:w-full aspect-[4/5] border border-gray-200 rounded-xl bg-white overflow-hidden transition-transform animate-scaleIn"
                            >
                                <div
                                    className="absolute top-0 w-full h-full overflow-hidden"
                                    style={{
                                        backgroundImage: `url(${item.coverImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'top',
                                        height: '80%'
                                    }}
                                />
                                <div className="flex justify-start absolute top-0 text-[0.8rem] text-gray-700 z-1 w-full pl-3 py-0.5">
                                    <div className="absolute top-0 left-0 w-full h-full bg-white opacity-100 z-0"></div>
                                    <div className="flex flex-row relative justify-center items-center z-2">
                                        <Image
                                            src={'/images/view.svg'}
                                            alt="view-icon"
                                            width={16}
                                            height={0}
                                            className="opacity-70 mr-1"
                                        />
                                        <p className="mr-2">{item.views}</p>
                                        <Image
                                            src={'/images/mainLike.svg'}
                                            alt="like-icon"
                                            width={14}
                                            height={0}
                                            className="opacity-70 mr-1"
                                        />
                                        <p className="relative">{item.likes}</p>
                                    </div>
                                </div>
                                <div className="absolute bg-white bottom-0 w-full text-left py-3 pl-4">
                                    <p className="text-[1.15rem] font-semibold truncate">
                                        {item.title}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[1rem] flex-grow truncate pr-4">
                                            {item.nickname} 작가
                                        </p>
                                        <p className="text-[0.8rem] text-gray-400 mr-4 -mb-0.5 whitespace-nowrap">
                                            {item.createdAt}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                    {!isEnd && <div ref={ref} />}
                </>
            )}
        </div>
    );
}

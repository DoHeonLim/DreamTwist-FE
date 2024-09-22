/**
File Name : mypage/MyCommentList
Description : 마이페이지 - 나의 댓글 리스트
Author : 나경윤

History
Date        Author   Status    Description
2024.08.05  나경윤    Created
2024.09.14  임도헌    Modified  반응형 UI 수정
*/

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMyCommentList } from '@/api/MypageApi';

interface CommentInfo {
    fairytaleId: number;
    content: string;
    title: string;
    createdAt: string;
    privatedAt: string;
}

export default function MyCommentList() {
    const [commentInfo, setCommentInfo] = useState<CommentInfo[]>([]);
    const router = useRouter();

    const handleCommentClick = (id: number, privatedAt: string) => {
        if (id !== null && privatedAt === null) {
            router.push(`/board/${id}`);
        }
        if (id !== null && privatedAt !== null) {
            alert('비공개 동화입니다.');
        }
    };

    useEffect(() => {
        const fetchMyComment = async () => {
            try {
                const data = await getMyCommentList();
                const commentData = data.myComments.map(
                    (item: CommentInfo) => ({
                        ...item,
                        createdAt: item.createdAt.split('T')[0]
                    })
                );

                setCommentInfo(commentData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMyComment();
    }, []);

    return (
        <div className="flex flex-col justify-start w-full mt-8 h-72 ">
            <div className="overflow-y-auto thin-scrollbar">
                {commentInfo.length > 0 ? (
                    commentInfo.map((item, index) => (
                        <div
                            key={item.title}
                            className="cursor-pointer"
                            onClick={() =>
                                handleCommentClick(
                                    item.fairytaleId,
                                    item.privatedAt
                                )
                            }
                        >
                            <div className="flex flex-col lg:flex-row justify-between">
                                <div>
                                    <p className="text-[1.05rem]">
                                        {item.content}
                                    </p>
                                </div>
                                <div className="flex flex-col lg:flex-row items-start lg:items-center">
                                    <p
                                        className={`text-[1.05rem] font-medium ${
                                            item.title === '삭제된 동화입니다.'
                                                ? 'text-gray-500'
                                                : 'text-main'
                                        }`}
                                    >
                                        {item.title}
                                    </p>
                                    <div className="w-px h-4 bg-gray-300 mx-3 hidden lg:flex" />
                                    <p className="text-[0.9rem] text-gray-400 mr-6">
                                        {item.createdAt}
                                    </p>
                                </div>
                            </div>
                            {index < commentInfo.length - 1 && (
                                <hr className="border-[0.5px] border-gray-200 w-full my-4" />
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-left text-gray-500">
                        댓글 내역이 없습니다.
                    </p>
                )}
            </div>
        </div>
    );
}

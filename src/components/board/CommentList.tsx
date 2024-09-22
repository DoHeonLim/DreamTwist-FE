/**
File Name : board/CommentList
Description : 동화 게시판 - 댓글 작성/목록
Author : 나경윤

History
Date        Author   Status    Description
2024.08.05  나경윤    Created
2024.09.13  임도헌    Modified  반응형 UI로 변경
2024.09.14  임도헌    Modified  반응형 UI 수정
*/

'use client';

import { useState, useEffect } from 'react';
import EditDeleteBtn from './EditDeleteBtn';
import CommentBox from './CommentBox';
import { getComment } from '@/api/BoardApi';

interface Comment {
    content: string;
    createdAt: string;
    id: string;
    profileImgURL: string;
    nickname: string | null;
}

export default function CommentList({ id }: { id: string }) {
    const [editCommentId, setEditCommentId] = useState<string | null>(null);
    const [commentInfo, setCommentInfo] = useState<Comment[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [userName, setUserName] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const storedUserName = localStorage.getItem('nickname');
        setUserName(storedUserName);

        const fetchCommentList = async (page: number) => {
            try {
                const data = await getComment(
                    `${id}?page=${currentPage}&limit=5`
                );
                const comments: Comment[] = data.data.map((item: Comment) => ({
                    content: item.content,
                    createdAt: item.createdAt.split('T')[0],
                    id: item.id,
                    profileImgURL: item.profileImgURL,
                    nickname: item.nickname || '탈퇴 회원' // 닉네임이 없으면 '탈퇴 회원'으로 대체
                }));

                setCommentInfo(comments);
                setTotalPages(data.totalPages); // 총 페이지 수 설정
                setCurrentPage(Number(data.currentPage));

                // console.log('댓글', data);
            } catch (error) {
                // console.error(error);
            }
        };

        fetchCommentList(currentPage);
    }, [id, currentPage]);

    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleEditClick = (id: string) => {
        setEditCommentId(id);
    };

    const handleCancelClick = () => {
        setEditCommentId(null);
    };

    return (
        <div className="flex flex-col w-3/5 min-w-[320px] lg:min-w-[520px] max-w-screen h-full">
            <div className="w-full">
                <p className="text-xl font-semibold text-left my-6">댓글</p>
                <CommentBox
                    editStatus={false}
                    initialContent=""
                    fairytaleId={id}
                />
                <div className="mt-16">
                    {commentInfo.map((item, index) => (
                        <div key={item.id}>
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row items-center">
                                    <div
                                        className="border rounded-full w-6 h-6 overflow-hidden mr-2"
                                        style={{
                                            backgroundImage: `url(${item.profileImgURL})`,
                                            backgroundSize: 'cover'
                                        }}
                                    />
                                    <p className="text-[1.05rem] font-medium">
                                        {item.nickname}
                                    </p>
                                </div>
                                <div className="flex flex-row items-end -mb-2">
                                    {userName === item.nickname && (
                                        <EditDeleteBtn
                                            id={item.id}
                                            modalType="comment"
                                            onEditClick={() =>
                                                handleEditClick(item.id)
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                            {editCommentId === item.id ? (
                                <div>
                                    <CommentBox
                                        editStatus={true}
                                        onCancel={handleCancelClick}
                                        initialContent={item.content}
                                        commentId={item.id}
                                        fairytaleId={id}
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-row justify-between items-center mt-3">
                                    <p>{item.content}</p>
                                    <p className="text-xs text-gray-500">
                                        {item.createdAt}
                                    </p>
                                </div>
                            )}
                            {index < commentInfo.length - 1 && (
                                <hr className="border-[0.5px] border-gray-200 w-full my-5" />
                            )}
                        </div>
                    ))}
                </div>
                {/* 페이지네이션 */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-10">
                        {totalPages > 5 && (
                            <button
                                type="button"
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                                className="text-main px-2 text-[1.3rem]"
                            >
                                {'<<'}
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="text-main px-2 text-[1.3rem]"
                        >
                            {'<'}
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .slice(
                                Math.max(currentPage - 3, 0),
                                Math.min(currentPage + 2, totalPages)
                            )
                            .map((page) => (
                                <button
                                    type="button"
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 text-[0.9rem] mx-1 rounded-full ${
                                        page === currentPage
                                            ? 'bg-main text-white border-main' // 현재 페이지인 경우
                                            : 'bg-white text-black border-gray-200' // 다른 페이지인 경우
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        <button
                            type="button"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="text-main px-2 text-[1.3rem]"
                        >
                            {'>'}
                        </button>
                        {totalPages > 5 && (
                            <button
                                type="button"
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                                className="text-main px-2 text-[1.3rem]"
                            >
                                {'>>'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

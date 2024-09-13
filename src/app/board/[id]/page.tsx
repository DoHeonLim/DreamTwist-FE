/**
File Name : board/page
Description : 동화 게시판
Author : 나경윤

History
Date        Author   Status    Description
2024.07.19  나경윤    Created
2024.07.31  나경윤    Modified  북 렌더 컴포넌트 통합
2024.09.13  임도헌   Modified  반응형 UI로 변경
*/

import { Metadata } from 'next';
import BookInfo from '@/components/board/BookInfo';
import CommentList from '@/components/board/CommentList';

export const metadata: Metadata = {
    title: '꿈틀 동화 갤러리',
    description: 'AI로 생성된 꿈틀의 동화 갤러리'
};

interface IBoardParams {
    params: { id: string };
}

export default function Board({ params: { id } }: IBoardParams) {
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <BookInfo id={id} />
            <div className="flex flex-col w-full h-full justify-center items-center mt-16">
                <CommentList id={id} />
            </div>
        </div>
    );
}

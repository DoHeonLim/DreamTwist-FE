/**
File Name : board/page
Description : 동화 게시판
Author : 나경윤

History
Date        Author   Status    Description
2024.07.19  나경윤    Created
2024.07.31  나경윤    Modified  북 렌더 컴포넌트 통합
*/

import RenderBook from '@/components/board/RenderBook';
import BookLike from '@/components/board/BookLike';
import Sample1 from '../../../../public/images/sample1.svg';
import Sample2 from '../../../../public/images/sample2.svg';
import { getBookDetail } from '@/apis/Board';

const sampleImages = [
    Sample1,
    Sample2,
    Sample1,
    Sample2,
    Sample1,
    Sample2,
    Sample2
];

const Board = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const data = await getBookDetail(id);

    // console.log(data);

    // const bookImages = [data[0].coverImage, ...data[0].images];
    const contents: string[] = [
        '내용00',
        '내용01',
        '내용02',
        ...(Object.values(data[0].content) as string[])
    ];

    // console.log(contents);

    return (
        <div className="h-screen flex flex-col justify-center items-center mt-8 mx-24 mb-12">
            <div className="relative flex flex-col w-full mb-6">
                <div className="flex flex-row justify-center items-center mb-3 m-auto">
                    <p className="text-2xl font-semibold">{data[0].title}</p>
                    <p className="text-[17px] ml-5">{data[0].nickname} 작가</p>
                    <div className="flex flex-row items-center absolute right-0 bottom-14">
                        <button type="button">
                            <p className="text-gray-400 text-[13px]">수정</p>
                        </button>
                        <p className="text-gray-400 text-[12px]">ㅣ</p>
                        <button type="button">
                            <p className="text-gray-400 text-[13px]">삭제</p>
                        </button>
                    </div>
                </div>
                <hr className="border border-zinc-200 opacity-70" />
                <div className="flex flex-row mt-2 justify-between">
                    <p className="text-gray-500 text-[13px]">조회 8</p>
                    <div className="self-end">
                        <BookLike />
                    </div>
                </div>
            </div>
            <RenderBook bookImages={sampleImages} contents={contents} />
        </div>
    );
};

export default Board;

/**
File Name : buildstory/page
Description : 동화 생성
Author : 김민규

History
Date        Author   Status    Description
2024.07.20  김민규    Created
2024.07.30  김민규    Modified  배경 디자인 변경
2024.08.07  임도헌    Modified  편집하기 링크 create로 변경
2024.09.14  임도헌    Modified  반응형 UI 수정
2024.09.22  임도헌    Modified  반응형 UI 수정

*/

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const BuildStoryPage: React.FC = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: 'url("/images/storybg.png")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="text-center w-full max-w-4xl my-32">
                <h1 className="text-2xl font-bold mb-6">
                    이야기를 어떻게 쓸까요?
                </h1>
                <p className="mb-12">
                    AI를 활용해서 글을 쓰거나 도움없이 직접 쓸 수 있어요.
                </p>

                <div className="flex flex-col md:flex-row gap-12 items-center mb-10">
                    <div className="relative bg-white p-8 rounded-lg shadow-md shadow-neutral-200 w-full max-w-md h-fit text-center border border-gray-200 flex flex-col items-center justify-center">
                        <div className="flex justify-center items-center text-green-500 text-4xl mb-7">
                            <Image
                                src="/images/pencil.svg"
                                alt="toEdit"
                                width={80}
                                height={80}
                            />
                        </div>
                        <h2 className="text-xl font-bold mb-4">직접 쓸래요</h2>
                        <p className="mb-7 text-center">
                            제목도 내용도 내가 직접 써요.
                            <br />
                            글쓰기 능력이 쑥쑥 올라요.
                        </p>
                        <Link
                            href="/create"
                            className="bg-main text-white w-36 py-2 px-4 rounded-md block text-center"
                        >
                            편집하기
                        </Link>
                    </div>

                    <div className="relative bg-white p-8 rounded-lg shadow-md shadow-neutral-200 w-full max-w-md h-fit text-center border border-gray-200 flex flex-col items-center justify-center">
                        <div className="absolute top-0 right-6 bg-yellow-400 text-black py-3 px-2 rounded-b-lg text-sm">
                            추천
                        </div>
                        <div className="flex justify-center items-center text-pink-300 text-4xl mb-4 -mt-2">
                            <Image
                                src="/images/greenAiIcon.svg"
                                alt="withAI"
                                width={100}
                                height={100}
                            />
                        </div>

                        <h2 className="text-xl font-bold mb-4">
                            AI와 함께 쓸래요
                        </h2>
                        <p className="mb-7 text-center">
                            AI와 동화책의 주제글들을 만들어요.
                            <br />
                            AI 기술을 활용해서 글을 쓸 수 있어요.
                        </p>
                        <Link
                            href="/buildstory/summery"
                            className="bg-main text-white w-36 py-2 px-4 rounded-md block text-center"
                        >
                            시작하기
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuildStoryPage;

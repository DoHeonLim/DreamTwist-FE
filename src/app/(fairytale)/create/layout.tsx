/**
File Name : app/(fairytale)/create/layout
Description : 동화 생성 레이아웃
Author : 임도헌

History
Date        Author   Status    Description
2024.07.25  임도헌   Created
2024.07.25  임도헌   Modified  동화 생성 레이아웃 추가
2024.08.07  임도헌   Modified  폴더위치 및 폴더명 변경
2024.09.19  임도헌   Modified  반응형 UI 수정
*/

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '꿈틀 동화 생성',
    description: 'AI를 사용하여 새로운 동화를 생성하세요 - 꿈틀'
};

export default function CreateLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <header className="py-4 bg-main-200 text-white text-center mb-4">
                <div className="container mx-auto flex items-center justify-center text-neutral-900">
                    <span className="text-[10px] sm:text-xs md:text-base lg:text-lg">
                        AI 스토리 추천
                    </span>
                    <span className="px-6 text-xl text-emerald-700">{'>'}</span>
                    <span className="text-[10px] sm:text-xs md:text-base lg:text-lg px-3 py-1 bg-white rounded-md">
                        글 편집
                    </span>
                    <span className="px-6 text-xl text-emerald-700">{'>'}</span>
                    <span className="text-[10px] sm:text-xs md:text-base lg:text-lg">
                        이미지 편집
                    </span>
                </div>
            </header>
            {children}
        </div>
    );
}

/**
File Name : buildstory/layout
Description : 동화 생성
Author : 김민규

History
Date        Author   Status    Description
2024.07.20  김민규    Created
2024.09.14  임도헌    Modified  반응형 UI 수정
*/

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '꿈틀 동화 생성',
    description: 'Ai 동화 생성 꿈틀 프로젝트'
};

function BuildStoryLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <header className="py-4 bg-main-200 text-white text-center">
                <div className="container mx-auto flex items-center justify-center text-neutral-900">
                    <span className="text-[10px] sm:text-xs md:text-base lg:text-lg px-3 py-1 bg-white rounded-md">
                        AI 스토리 추천
                    </span>
                    <span className="px-6 text-xl text-emerald-700">{'>'}</span>
                    <span className="text-[10px] sm:text-xs md:text-base lg:text-lg">
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
export default BuildStoryLayout;

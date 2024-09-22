/**
File Name : board/RenderBooks
Description : 동화 게시판 - 동화책 렌더 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.30  나경윤   Created
2024.09.13  임도헌   Modified  반응형 UI로 변경
2024.09.14  임도헌    Modified  반응형 UI 수정
*/

'use client';

import usePagination from '@/hooks/usePagination';
import BookViewer from './BookViewer';
import PreviewBlank from './PreviewBlank';
import Logo from '../../../public/images/logo.svg';

interface Info {
    title: string;
    nickname: string;
}

interface BookInfoProps {
    contents: string[];
    bookImages: string[];
    info: Info;
}

const pageCount: number = 8;
const endImg = Logo;

export default function RenderBook({
    contents,
    bookImages,
    info
}: BookInfoProps) {
    const { step, setStep, nextStep, prevStep } = usePagination();

    const handlePreviewClick = (index: number) => {
        setStep(index);
    };

    const getTextForStep = (step: number) => {
        if (step === 0 || step === pageCount - 1) return '';
        return contents[step - 1] || '';
    };

    const getCurrentImage = (step: number): [string, string] => {
        if (step === pageCount - 1) {
            return [`url(${endImg.src})`, '30% 30%'];
        }
        return [`url(${bookImages[step]})`, '110% 110%'];
    };

    return (
        <>
            <div className="flex flex-row w-full h-full justify-center items-center mb-12">
                <BookViewer
                    step={step}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    getTextForStep={getTextForStep}
                    getCurrentImage={getCurrentImage}
                    info={info}
                />
            </div>
            <div className="flex overflow-x-scroll w-3/5 min-w-[320px] lg:min-w-[520px] max-w-[66rem] lg:max-w-1/2 h-full custom-scrollbar">
                <PreviewBlank
                    step={step}
                    getTextForStep={getTextForStep}
                    getCurrentImage={getCurrentImage}
                    handlePreview={handlePreviewClick}
                    info={info}
                />
            </div>
        </>
    );
}

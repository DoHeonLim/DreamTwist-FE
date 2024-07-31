/**
File Name : board/RenderBooks
Description : 동화 게시판 - 동화책 렌더 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.30  나경윤    Created
*/

'use client';

import { StaticImageData } from 'next/image';
import usePagination from '@/hooks/usePagination';
import BookViewer from './BookViewer';
import PreviewBlank from './PreviewBlank';

interface BookInfoProps {
    contents: string[];
    coverImg: StaticImageData;
    bookImages: StaticImageData[];
}

const pageCount: number = 6;

export default function RenderBook({
    contents,
    coverImg,
    bookImages
}: BookInfoProps) {
    const { step, setStep, nextStep, prevStep } = usePagination();

    const handlePreviewClick = (index: number) => {
        setStep(index);
    };

    const getTextForStep = (step: number) => {
        if (step === 0 || step === pageCount - 1) return '';
        return contents[step - 1] || '';
    };

    const getCurrentImage = (step: number) => {
        if (step === 0 || step === pageCount - 1) {
            return `url(${coverImg.src})`;
        }
        return `url(${bookImages[step - 1].src})`;
    };

    return (
        <>
            <div className="flex flex-row w-full h-3/6 justify-center items-center mb-20 mt-2">
                <BookViewer
                    step={step}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    getTextForStep={getTextForStep}
                    getCurrentImage={getCurrentImage}
                />
            </div>
            <div className="flex overflow-x-scroll w-4/6 custom-scrollbar">
                <PreviewBlank
                    step={step}
                    getTextForStep={getTextForStep}
                    getCurrentImage={getCurrentImage}
                    handlePreview={handlePreviewClick}
                />
            </div>
        </>
    );
}

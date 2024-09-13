/**
File Name : board/BookViewer
Description : 동화 게시판 - 동화 뷰어 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.19  나경윤    Created
2024.07.21  나경윤    Modified  페이지 구분 추가
2024.07.28  나경윤    Modified  줄거리 텍스트 이미지로 적용 추가
2024.08.04  나경윤    Modified  동화 내용 api 연결
2024.09.13  임도헌    Modified  반응형 UI로 변경
*/

'use client';

import { useMemo } from 'react';
import { ArrowIcon } from '../icons/ArrowIcon';
import useTextToImage from '@/hooks/useTextToImage';

interface Info {
    title: string;
    nickname: string;
}

interface ViewerProps {
    step: number;
    nextStep: () => void;
    prevStep: () => void;
    getTextForStep: (step: number) => string;
    getCurrentImage: (step: number) => [string, string];
    info: Info;
}

const pageCount: number = 8;

export default function BookViewer({
    step,
    nextStep,
    prevStep,
    getTextForStep,
    getCurrentImage,
    info
}: ViewerProps) {
    const text = getTextForStep(step);
    const canvasRef = useTextToImage(text);

    const renderBooks = () => {
        const [backgroundImage, backgroundSize] = getCurrentImage(step);

        const [view, width] = useMemo(
            () =>
                step === 0 || step === pageCount - 1
                    ? ['hidden', 'min-w-[400px] lg:min-w-[520px] max-w-screen']
                    : ['block', 'min-w-[400px] lg:min-w-[520px] max-w-screen'],
            [step]
        );

        const titleFontSize =
            info.title.length > 20
                ? 'text-[1.6rem] lg:text-[1.8rem]'
                : 'text-[1.8rem] lg:text-[2rem]';

        return (
            <div
                className={`relative flex flex-col lg:flex-row justify-center min-h-[400px] lg:min-h-[520px] max-h-screen items-center ${width} mx-4 lg:mx-8`}
                style={{ margin: 'auto' }}
            >
                <div
                    className="relative border-solid border border-gray-100 bg-cover bg-center bg-no-repeat shadow-lg min-w-[400px] lg:min-w-[520px] max-w-screen min-h-[400px] lg:min-h-[520px] max-h-screen"
                    style={{
                        backgroundImage: backgroundImage,
                        backgroundSize: backgroundSize
                    }}
                >
                    <div
                        className={`${step === 0 ? 'block' : 'hidden'} select-none absolute bottom-0 flex flex-col justify-center items-center bg-white w-full h-[7.5rem]`}
                    >
                        <p
                            className={`mb-0.5 ${titleFontSize} text-slate-800 font-LaundryGothic`}
                        >
                            {info.title}
                        </p>
                        <p className="font-Hyemin text-slate-800 text-[1rem]">
                            {info.nickname} 작가
                        </p>
                    </div>
                </div>
                <div
                    className={`${view} flex justify-center items-center border-solid border border-gray-100 w-[400px] lg:w-[520px] min-h-[400px] lg:min-h-[520px] shadow-lg`}
                >
                    <canvas
                        ref={canvasRef}
                        className="flex justify-center items-center w-full h-[80%] box-border px-4"
                    />
                </div>
            </div>
        );
    };

    return (
        <>
            <button
                type="button"
                onClick={prevStep}
                className={`${step !== 0 ? '' : 'opacity-0 pointer-events-none'}`}
            >
                <ArrowIcon rotate="180" />
            </button>
            <div className="px-8">{renderBooks()}</div>
            <button
                type="button"
                onClick={nextStep}
                className={`${step < pageCount - 1 ? '' : 'opacity-0 pointer-events-none'}`}
            >
                <ArrowIcon rotate="0" />
            </button>
        </>
    );
}

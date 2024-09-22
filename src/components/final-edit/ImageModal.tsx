/**
File Name : compoenents/final-edit/ImageModal
Description : 이미지 첨부 모달
Author : 임도헌

History
Date        Author   Status    Description
2024.07.24  임도헌   Created
2024.07.24  임도헌   Modified   이미지 업로드 모달 추가
2024.07.27  임도헌   Modified   portal 적용
2024.07.29  임도헌   Modified   필요없는 코드 삭제
2024.07.31  임도헌   Modified   쓸데 없는 코드 전부 삭제 및 portal 수정 및 react-hook-form으로 코드 변경
2024.08.02  임도헌   Modified   creationWays 코드 추가 및 File 형태 폼제출 할 수 있도록 수정
2024.08.03  임도헌   Modified    코드 분리
2024.08.05  임도헌   Modified   커버 생성때 사용할 수 있는 동화 제목 추가
2024.08.08  임도헌   Modified   eslint 에러 처리
2024.09.14  임도헌   Modified  반응형 UI 수정
2024.09.19  임도헌   Modified  반응형 UI 수정
*/

import React from 'react';
import Image from 'next/image';
import Portal from '../common/Portal';
import FileUploadModal from './FileUploadModal';
import PaletteModal from './PaletteModal';
import AiModal from './AiModal';
import { useBookModal } from '@/hooks/useModal';
import { CreationMethod } from '@/hooks/useBook';

interface ImageModalProps {
    credit: string;
    title: string;
    currentPage: number;
    updateCreationWay: (index: number, method: CreationMethod) => void;
    onClose: () => void;
    onImageSelect: (fileOrUrl: File | string) => void;
    initialText: string;
}

export default function ImageModal({
    credit,
    title,
    currentPage,
    updateCreationWay,
    onClose,
    onImageSelect,
    initialText
}: ImageModalProps) {
    const {
        fileUploadModalOpen,
        setFileUploadModalOpen,
        paletteModalOpen,
        setPaletteModalOpen,
        aiModalOpen,
        setAiModalOpen
    } = useBookModal();

    const handleFileUpload = (image: File) => {
        onImageSelect(image);
        updateCreationWay(currentPage, 'upload');
        setFileUploadModalOpen(false);
        onClose();
    };

    const handleDrawingUpload = (image: File) => {
        onImageSelect(image);
        updateCreationWay(currentPage, 'palette');
        setPaletteModalOpen(false);
        onClose();
    };

    const handleAiUpload = (imageUrl: string) => {
        onImageSelect(imageUrl);
        updateCreationWay(currentPage, 'ai');
        setAiModalOpen(false);
        onClose();
    };

    return (
        <Portal>
            <div className="fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-dark/90 z-50 bg-black bg-opacity-50">
                <div className="w-[300px] sm:w-[512px] md:w-[700px] lg:w-[820px] rounded-lg bg-white text-center first-line: border-[1px] border-main px-8">
                    <button
                        type="button"
                        onClick={() => onClose()}
                        className="ml-auto block mb-4 mt-5"
                    >
                        <Image
                            src="/images/cancleIcon.svg"
                            width={40}
                            height={40}
                            alt="cancle"
                        />
                    </button>
                    <p className="text-2xl font-bold mb-12">
                        이미지 생성 방식을 선택해주세요
                    </p>
                    <div className=" flex flex-col space-y-4 md:space-y-0 md:flex-row bg-green-200 w-full h-[350px] rounded-xl justify-around items-center py-8 mb-8">
                        <button
                            type="button"
                            onClick={() => setPaletteModalOpen(true)}
                            className="flex flex-col w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] bg-main rounded-lg justify-center items-center hover:bg-green-600"
                        >
                            <div className="relative w-[50px] h-[50px] md:w-[75px] md:h-[75px] lg:w-[100px] lg:h-[100px]">
                                <Image
                                    src="/images/paletteIcon.svg"
                                    fill
                                    className="object-cover mx-auto"
                                    alt="picture"
                                />
                            </div>
                            <p className="font-bold text-xl text-white">
                                그림판
                            </p>
                        </button>
                        <button
                            type="button"
                            onClick={() => setFileUploadModalOpen(true)}
                            className="flex flex-col w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] bg-main rounded-lg justify-center items-center hover:bg-green-600"
                        >
                            <div className="relative w-[50px] h-[50px] md:w-[75px] md:h-[75px] lg:w-[100px] lg:h-[100px]">
                                <Image
                                    src="/images/pictureIcon.svg"
                                    fill
                                    className="object-cover mx-auto"
                                    alt="picture"
                                />
                            </div>
                            <p className="font-bold text-xl text-white">
                                사진 첨부
                            </p>
                        </button>
                        <button
                            type="button"
                            onClick={() => setAiModalOpen(true)}
                            className="flex flex-col w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] bg-main rounded-lg justify-center items-center hover:bg-green-600"
                        >
                            <div className="relative w-[50px] h-[50px] md:w-[75px] md:h-[75px] lg:w-[100px] lg:h-[100px]">
                                <Image
                                    src="/images/aiIcon.svg"
                                    fill
                                    className="object-cover mx-auto"
                                    alt="palette"
                                />
                            </div>
                            <p className="font-bold text-xl text-white">AI</p>
                        </button>
                    </div>

                    {fileUploadModalOpen && (
                        <FileUploadModal
                            onClose={() => setFileUploadModalOpen(false)}
                            onFileSelect={handleFileUpload}
                        />
                    )}
                    {paletteModalOpen && (
                        <PaletteModal
                            onClose={() => setPaletteModalOpen(false)}
                            handleDrawingUpload={handleDrawingUpload}
                        />
                    )}
                    {aiModalOpen && (
                        <AiModal
                            credit={credit}
                            onClose={() => setAiModalOpen(false)}
                            handleAiUpload={handleAiUpload}
                            currentPage={currentPage}
                            title={title}
                            initialText={initialText}
                        />
                    )}
                </div>
            </div>
        </Portal>
    );
}

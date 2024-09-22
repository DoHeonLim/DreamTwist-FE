/**
File Name : compoenents/final-edit/FileUploadModal
Description : 이미지 첨부에서 파일 업로드 시
Author : 임도헌

History
Date        Author   Status     Description
2024.07.26  임도헌   Created
2024.07.26  임도헌   Modified   파일 업로드 컴포넌트 추가
2024.07.31  임도헌   Modified   portal 수정 및 react-hook-form으로 코드 변경
2024.08.02  임도헌   Modified   creationWays 코드 추가 및 File 형태 폼제출 할 수 있도록 수정
2024.08.03  임도헌   Modified   코드 분리
*/

import React from 'react';
import Image from 'next/image';
import Portal from '../common/Portal';
import { useFileUploadModal } from '@/hooks/useFileUploadModal';

interface FileUploadModalProps {
    onClose: () => void;
    onFileSelect: (file: File) => void;
}

export default function FileUploadModal({
    onClose,
    onFileSelect
}: FileUploadModalProps) {
    const { fileRef, image, handleClick, handleFileChange, handleSubmit } =
        useFileUploadModal();

    return (
        <Portal>
            <div className="fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-dark/90 z-50 bg-black bg-opacity-50">
                <div className="w-[300px] sm:w-[512px] md:w-[700px] lg:w-[820px] rounded-lg bg-white text-center first-line: border-[1px] border-main px-8">
                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-auto block mb-4 mt-5"
                    >
                        <Image
                            src="/images/cancleIcon.svg"
                            width={40}
                            height={40}
                            alt="cancle"
                        />
                    </button>

                    <input
                        className="hidden"
                        type="file"
                        accept="image/*"
                        ref={fileRef}
                        onChange={handleFileChange}
                    />
                    <div className="w-18 h-18">
                        <button
                            className="p-8 bg-gray-200 rounded-md flex-none"
                            type="button"
                            onClick={handleClick}
                        >
                            <Image
                                src="/images/PalettePicture.svg"
                                width={60}
                                height={60}
                                alt="picture"
                            />
                        </button>
                    </div>
                    <div className="flex justify-center m-10">
                        {image ? ( // 이미지가 있을 때만 렌더링
                            <div className="relative flex justify-center w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] border-[3px] border-gray-400">
                                <Image
                                    src={image}
                                    fill
                                    alt="image preview"
                                    className="object-fit "
                                />
                            </div>
                        ) : (
                            // 이미지가 없으면 빈 div 보여준다.
                            <div className="flex justify-center items-center w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] font-bold border-[3px] border-gray-400">
                                빈 이미지
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => handleSubmit(onFileSelect)}
                        className="px-6 py-2 bg-main text-white rounded-md mb-10"
                    >
                        확인
                    </button>
                </div>
            </div>
        </Portal>
    );
}

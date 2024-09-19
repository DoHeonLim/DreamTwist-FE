/* eslint-disable no-nested-ternary */
/**
File Name : compoenents/final-edit/AiModal
Description : 이미지 첨부에서 ai 사용 시
Author : 임도헌

History
Date        Author   Status    Description
2024.07.26  임도헌   Created
2024.07.26  임도헌   Modified  AI 모달 디자인만 생성
2024.08.01  임도헌   Modified  AI 모달 기능 추가
2024.08.05  임도헌   Modified  ai 이미지 받아오기 추가
2024.08.07  임도헌   Modified  fetchAiImage api 분리
2024.08.07  임도헌   Modified  useaiImage로 커스텀 훅 분리
2024.09.19  임도헌   Modified  반응형 UI 수정
*/

import { useState } from 'react';
import Image from 'next/image';
import Portal from '../common/Portal';
import LoadingSpinner from '../common/LoadingSpinner';
import useAiImage from '@/hooks/useAiImage';

interface AiModalProps {
    onClose: () => void;
    handleAiUpload: (imageUrl: string) => void;
    credit: string;
    currentPage: number;
    title: string;
    initialText: string;
}

export default function AiModal({
    onClose,
    handleAiUpload,
    credit,
    currentPage,
    title,
    initialText
}: AiModalProps) {
    const [prompt, setPrompt] = useState('');
    const { loading, imageUrl, generateImage } = useAiImage();

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async () => {
        await generateImage(prompt);
    };

    const handleConfirm = () => {
        if (imageUrl) {
            handleAiUpload(imageUrl);
            onClose();
        }
    };

    return (
        <Portal>
            <div className="fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-dark/90 z-50 bg-black bg-opacity-50">
                <div className="w-full max-w-[900px] rounded-lg bg-white border-[1px] border-main px-8 py-8">
                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-auto block mb-4"
                    >
                        <Image
                            src="/images/cancleIcon.svg"
                            width={40}
                            height={40}
                            alt="cancel"
                        />
                    </button>

                    {/* 메인 컨테이너를 flex로 변경하여 div, input, 이미지가 가로로 정렬되도록 설정 */}
                    <div className="flex items-start">
                        <div className="flex-grow">
                            <div className="font-bold text-[11px] lg:text-xl mb-4 text-center">
                                <p>
                                    제목 또는 줄거리를 참고하여 원하는 장면을
                                    적어주세요.
                                </p>
                                <p>AI가 그림을 생성합니다.</p>
                            </div>
                            <div className="bg-green-200 w-full h-[300px] rounded-xl justify-between items-center p-8 mb-4 font-bold resize-none overflow-auto">
                                {currentPage === 0 ? title : initialText}
                            </div>

                            <input
                                placeholder="여기에 원하는 장면들을 묘사해주세요(예시: 강아지가 헤엄치는 모습)"
                                value={prompt}
                                onChange={handlePromptChange}
                                className="bg-yellow-200 w-full h-[40px] text-xs lg:textxl  rounded-lg mb-4 p-4"
                                disabled={loading || imageUrl !== null}
                            />
                        </div>

                        {imageUrl && (
                            <div className="flex-shrink-0 ml-4">
                                <p className="flex justify-center font-bold text-lg mb-12">
                                    미리보기
                                </p>
                                <Image
                                    src={imageUrl}
                                    alt="AI Generated Preview"
                                    width={300}
                                    height={300}
                                    className="rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end items-center mb-10">
                        <p className="font-bold text-lg mr-4 text-gray-600">
                            잔여 나뭇잎 : {credit}
                        </p>

                        <button
                            type="button"
                            onClick={imageUrl ? handleConfirm : handleSubmit}
                            className="px-6 py-2 bg-main text-white rounded-md"
                            disabled={loading}
                        >
                            {loading
                                ? '처리 중...'
                                : imageUrl
                                  ? '확인'
                                  : '생성'}
                        </button>
                    </div>
                </div>
                {loading && <LoadingSpinner />}
            </div>
        </Portal>
    );
}

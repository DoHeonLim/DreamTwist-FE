/**
File Name : compoenents/final-edit/StoryModal
Description : 동화 내용 변경 모달
Author : 임도헌

History
Date        Author   Status    Description
2024.07.24  임도헌   Created
2024.07.24  임도헌   Modified   그림판 모달 추가
2024.07.27  임도헌   Modified   portal 적용
2024.07.29  임도헌   Modified   필요없는 코드 삭제
2024.07.31  임도헌   Modified   portal 수정 및 react-hook-form으로 코드 변경
2024.08.03  임도헌   Modified   코드 분리
2024.08.08  임도헌   Modified    eslint 에러 처리
2024.09.14  임도헌    Modified  반응형 UI 수정
*/

import { useState } from 'react';
import Image from 'next/image';
import Portal from '../common/Portal';

interface StoryModalProps {
    initialText: string;
    onClose: () => void;
    onChange: (text: string) => void;
}

export default function StoryModal({
    initialText,
    onClose,
    onChange
}: StoryModalProps) {
    const [story, setStory] = useState(initialText);

    const handleSave = () => {
        onChange(story);
        onClose();
    };

    return (
        <Portal>
            <div className="fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-dark/90 z-50 bg-black bg-opacity-50">
                <div className="w-full max-w-[320px] rounded-lg bg-white text-center first-line: border-[1px] border-main px-8">
                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-[800px] mt-[20px]"
                    >
                        <Image
                            src="/images/cancleIcon.svg"
                            width={40}
                            height={40}
                            alt="cancle"
                        />
                    </button>

                    <p className="text-2xl font-bold mb-12">내용 편집</p>
                    <textarea
                        value={story}
                        onChange={(e) => setStory(e.target.value)}
                        className="flex bg-green-200 w-full h-[300px] rounded-xl justify-between items-center p-8 font-bold resize-none overflow-auto focus:outline-none focus:border-none"
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleSave}
                            className="bg-main text-white font-bold rounded-lg px-4 py-2 my-4"
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
}

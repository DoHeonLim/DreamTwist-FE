/**
File Name : board/DeleteModal
Description : 삭제 확인 모달창
Author : 나경윤

History
Date        Author   Status    Description
2024.08.02  나경윤    Created
*/

'use client';

import Image from 'next/image';

interface DeleteModalProps {
    cancelClick: () => void;
}

export default function DeleteModal({ cancelClick }: DeleteModalProps) {
    return (
        <div className="flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 bg-white w-96 h-fit p-4 py-8 rounded-md shadow shadow-stone-300">
            <div className="flex flex-col justify-center items-center">
                <Image
                    src={'/images/warning.svg'}
                    alt="warning"
                    width={35}
                    height={0}
                />
                <p className="font-semibold text-xl my-4">
                    정말 삭제하시겠습니까?
                </p>
                <div className="space-x-3 mt-2">
                    <button className="bg-red-600 text-white px-4 py-1 border rounded-md">
                        삭제
                    </button>
                    <button
                        type="button"
                        onClick={cancelClick}
                        className="bg-gray-200 text-black px-4 py-1 border rounded-md"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

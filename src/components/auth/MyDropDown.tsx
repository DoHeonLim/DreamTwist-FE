/**
File Name : auth/MyDropdown
Description : 정렬 드롭다운 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.08.06  나경윤    Created
2024.08.07  나경윤    Modified   로그아웃 연결
2024.08.10  임도헌    Modified  로그아웃 모달 추가
2024.09.11  임도헌    Modified   반응형 UI 적용
2024.09.13  임도헌    Modified  반응형 UI 수정
*/

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { postLogout } from '@/api/AuthApi';
import LogoutModal from '@/components/auth/LogoutModal';

const options = ['마이페이지', '로그아웃'];

export default function MyDropdown({
    handleToggleMobileMenu
}: {
    handleToggleMobileMenu?: () => void;
}) {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);

    const handleOptionClick = (index: number) => {
        if (index === 0) {
            router.push('/mypage');
        }
        if (index === 1) {
            setShowModal(true);
        }
    };

    const handleLogoutConfirm = async () => {
        try {
            await postLogout();
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        } finally {
            setShowModal(false);
        }
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <div className="z-10 bg-white">
            <ul className="bg-white w-[6.5rem] h-fit text-left border border-gray-200 rounded-sm">
                {options.map((option, index) => (
                    <li
                        key={option}
                        className="hover:bg-gray-100 cursor-pointer text-[0.9rem]"
                    >
                        <button
                            type="button"
                            className="w-full text-center py-1.5"
                            onClick={() => {
                                handleOptionClick(index);
                                handleToggleMobileMenu?.();
                            }}
                        >
                            {option}
                        </button>

                        {index < options.length - 1 && (
                            <hr className="border-gray-200 mx-1" />
                        )}
                    </li>
                ))}
            </ul>

            {/* 로그아웃 확인 모달 */}
            <LogoutModal
                isOpen={showModal}
                onConfirm={handleLogoutConfirm}
                onCancel={handleCancel}
            />
        </div>
    );
}

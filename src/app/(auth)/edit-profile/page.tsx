/**
File Name : mypage/edit-profile
Description : 마이페이지 - 프로필 편집
Author : 나경윤

History
Date        Author   Status    Description
2024.08.05  나경윤    Created
2024.09.14  임도헌    Modified  반응형 UI 수정
*/

import { Metadata } from 'next';
import EditProfileList from '@/components/auth/EditProfileList';

export const metadata: Metadata = {
    title: '꿈틀 프로필 수정',
    description: '프로필을 등록하고 다양한 꿈틀 작가들과 만나보아요.'
};

export default function EditProfile() {
    return (
        <div className="flex flex-col justify-center items-center mt-20">
            <div className="relative flex flex-col justify-center items-center bg-white w-full sm:w-96 h-[35rem] rounded-xl shadow-lg border border-gray-100 shadow-gray-200">
                <p className="text-main font-semibold text-[1.6rem] mb-12 -mt-6">
                    프로필 수정
                </p>
                <EditProfileList />
            </div>
        </div>
    );
}

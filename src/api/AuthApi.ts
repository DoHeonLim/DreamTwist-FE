/**
File Name : api/Auth
Description : 회원 api 함수
Author : 나경윤

History
Date        Author   Status    Description
2024.08.07  나경윤    Created
2024.08.08  나경윤    Modified  로그아웃, 탈퇴 추가
2024.08.09  임도헌   Modified  탈퇴 기능 수정
*/

const API_BASE_URL = 'http://localhost:4000';

export const getUserInfo = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${API_BASE_URL}/users`, {
        cache: 'reload',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error('유저 정보 조회 실패');
    }

    return response.json();
};

export const postLogout = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${API_BASE_URL}/users/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    });

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('nickname');
    localStorage.removeItem('email');
    localStorage.removeItem('profileImage');

    if (!response.ok) {
        throw new Error('로그아웃 실패');
    }

    return response.json();
};

export const postUserPresignedURL = async (fileName: string) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${API_BASE_URL}/users/presigned-url`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            fileName
        })
    });
    if (!response.ok) {
        throw new Error('AWS S3 에서 presigned URL 응답 실패');
    }
    return response.json();
};

export const patchProfile = async (name: string, url: string) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${API_BASE_URL}/users/update`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            nickname: name,
            profileImageURL: url
        })
    });
    if (!response.ok) {
        throw new Error('프로필 수정 실패');
    }
    return response.json();
};

export const deleteAuth = async (email: string | null): Promise<void> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken || !email) {
        throw new Error('유효한 접근 토큰 또는 이메일을 찾을 수 없습니다.');
    }

    const response = await fetch(`${API_BASE_URL}/users/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ email })
    });

    if (!response.ok) {
        throw new Error('회원 탈퇴 실패');
    }
};
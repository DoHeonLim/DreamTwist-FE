/**
File Name : hooks/useBookForm
Description : Book 컴포넌트에서 사용하는 훅폼
Author : 임도헌

History
Date        Author   Status    Description
2024.08.03  임도헌   Created
2024.08.03  임도헌   Modified  북폼 커스텀 훅 추가
2024.08.07  임도헌   Modified  fairytaleId props 추가
2024.08.07  임도헌   Modified  fairytaleId가 있다면 데이터 불러와서 폼에 적용
2024.08.07  임도헌   Modified  유저 닉네임 추가(작가 명)
2024.08.10  임도헌   Modified  유저 접근 권한 코드 추가
2024.08.21  임도헌   Modified  동화 생성 시 유저 닉네임 안보이는 것 수정

*/

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFairytailInfo } from './useFairytailInfo';

export type PageData = {
    image: File | string | null;
    story: string;
};

export type FormData = {
    title: string;
    theme: string;
    cover: File | string | null;
    isPublic: boolean;
    pages: PageData[];
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useBookForm = (fairytaleId?: number) => {
    // 유저 Id 불러오기
    const [userId, setUserId] = useState<number>(0);

    // 유저 닉네임 불러오기
    const [nickname, setNickname] = useState<string | null>(null);
    // 로딩 상태 추가
    const [loading, setLoading] = useState<boolean>(true);

    // 로컬 스토리지 데이터 불러오기
    const { title, theme, storys, isPublic } = useFairytailInfo();
    // useForm 사용해서 값 세팅한다.
    const { register, setValue, watch, handleSubmit, reset, control } =
        useForm<FormData>({
            defaultValues: {
                cover: null,
                theme,
                isPublic,
                pages:
                    storys.length > 0
                        ? storys.map((story) => ({ image: null, story }))
                        : [{ image: null, story: '' }]
            }
        });

    // fairytaleId가 존재하면 reset해서 현재 값 세팅
    useEffect(() => {
        const fairytaleData = async () => {
            if (fairytaleId) {
                try {
                    const response = await fetch(
                        `${API_BASE_URL}/fairytale/${fairytaleId}`
                    );
                    const data = await response.json();
                    const savedCover = data[0].coverImage;
                    const savedImages = data[0].images;
                    const savedStorys = storys;
                    const savedIsPublic = isPublic;
                    setUserId(data[0].userId);
                    setNickname(data[0].nickname);

                    const pages = savedStorys.map((story, index) => ({
                        image: savedImages[index] || null,
                        story
                    }));

                    reset({
                        title,
                        theme,
                        cover: savedCover,
                        isPublic: savedIsPublic,
                        pages
                    });
                } catch (error) {
                    console.error(`Error fetching fairytale data: ${error}`);
                }
            } else {
                setNickname(localStorage.getItem('nickname'));
                reset({
                    title,
                    theme,
                    cover: null,
                    isPublic,
                    pages: storys.map((story) => ({ image: null, story }))
                });
            }
            setLoading(false); // 데이터 로딩 완료 후 로딩 상태 해제
        };
        fairytaleData();
    }, [title, theme, storys, isPublic, reset]);

    // 현재 페이지랑 커버 볼수 있게
    const pages = watch('pages');
    const cover = watch('cover');

    return {
        register,
        setValue,
        watch,
        handleSubmit,
        reset,
        control,
        pages,
        cover,
        title,
        theme,
        userId,
        nickname,
        loading
    };
};

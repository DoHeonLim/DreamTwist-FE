/**
File Name : hooks/useFileUploadModal
Description : useFileUploadModal에서 사용하는 훅
Author : 임도헌

History
Date        Author   Status    Description
2024.08.03  임도헌   Created
2024.12.05  임도헌   Modified   파일 크기 초과 예외처리 추가
*/

import { useRef, useState } from 'react';

export const useFileUploadModal = () => {
    const fileRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleClick = () => {
        fileRef?.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
            if (file.size > MAX_FILE_SIZE) {
                setError('파일 크기는 5MB를 초과할 수 없습니다.');
                return;
            }
            const fileUrl = URL.createObjectURL(file);
            setImage(fileUrl);
            setSelectedFile(file);
            setError(null); // 에러 메시지 초기화
        }
    };

    const handleSubmit = (onFileSelect: (file: File) => void) => {
        if (selectedFile) {
            onFileSelect(selectedFile);
        }
    };

    return {
        fileRef,
        image,
        error, // 에러 메시지 반환
        handleClick,
        handleFileChange,
        handleSubmit
    };
};

/**
File Name : common/Tag
Description : 태그 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.21  나경윤   Created
2024.09.13  임도헌   Modified  반응형 UI로 변경
*/

interface TagProps {
    label: string;
    isSelected: boolean;
    onTagClick: () => void;
}

export default function Tag({ label, isSelected, onTagClick }: TagProps) {
    return (
        <div>
            <button
                type="button"
                onClick={onTagClick}
                className={`w-16 h-8 md:w-28 md:h-14 md:text-base xl:w-32 2xl:w-36 text-sm rounded-xl hover:bg-main hover:text-white ${
                    isSelected ? 'bg-main text-white' : 'bg-gray-100'
                }`}
            >
                {label}
            </button>
        </div>
    );
}

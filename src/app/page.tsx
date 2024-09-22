/**
File Name : app/page
Description : 메인 페이지
Author : 나경윤

History
Date        Author   Status    Description
2024.07.21  나경윤   Modified  메인 화면 구현
2024.08.02  나경윤   Modified  전체 동화 api 연결
2024.08.09  나경윤   Modified  배너 추가
2024.09.13  임도헌   Modified  반응형 UI로 변경
*/

import Image from 'next/image';
import SearchBook from '@/components/main/SearchBook';
import ScrollUpButton from '@/components/main/ScrollUpButton';
import MainBanner from '@/components/main/MainBanner';
import BestBook from '@/components/main/BestBook';

export default function Home() {
    return (
        <main className="flex flex-col justify-center items-center mx-4 mt-2 md:mx-24 md:mt-16">
            <MainBanner />
            <div className="flex flex-col justify-center items-center w-full -mb-5">
                <div className="flex flex-row justify-center items-center text-[1.45rem] bg-white px-1 md:px-6 z-20">
                    <Image
                        src={'/images/star.svg'}
                        alt="star-icon"
                        width={30}
                        height={0}
                        className="mr-1.5"
                    />
                    <p className="font-LaundryGothic mt-1">명예의 전당</p>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center w-[320px] md:w-full">
                <BestBook />
            </div>

            <div className="flex flex-col justify-center items-center w-[320px] md:w-full">
                <SearchBook />
            </div>
            <ScrollUpButton />
        </main>
    );
}

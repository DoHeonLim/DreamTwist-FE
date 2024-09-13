/**
File Name : MainBanner
Description : 메인 배너
Author : 나경윤

History
Date        Author   Status    Description
2024.08.08  나경윤    Created
2024.09.13  임도헌   Modified  반응형 UI로 변경
*/

'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function MainBannero() {
    const [imageUrl, setImageUrl] = useState('/images/main1.png');
    return (
        <div
            className="flex items-center justify-center relative bg-main-100 h-80 w-full mb-7 rounded-xl overflow-hidden"
            onMouseEnter={() => setImageUrl('/images/main2.png')}
            onMouseLeave={() => setImageUrl('/images/main1.png')}
        >
            <div className="absolute flex flex-row items-center justify-center">
                <Image
                    src={'/images/main3.png'}
                    alt="main-img"
                    width={700}
                    height={0}
                    className="hidden md:block md:ml-[17rem] md:-mr-24"
                />

                <Image
                    src={imageUrl}
                    alt="main-img"
                    width={430}
                    height={0}
                    className="hidden md:block mt-20 mr-72"
                />
            </div>
            {/* 모바일 화면일때 배너 */}
            <div className="absolute flex flex-col items-center justify-center">
                <Image
                    src={'/images/main3.png'}
                    alt="main-img"
                    width={300}
                    height={0}
                    className="md:hidden ml-8"
                />
                <Image
                    src={imageUrl}
                    alt="main-img"
                    width={200}
                    height={0}
                    className="md:hidden"
                />
            </div>
        </div>
    );
}

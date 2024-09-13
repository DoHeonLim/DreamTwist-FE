/**
File Name : Nav
Description : 네브바
Author : 나경윤

History
Date        Author   Status    Description
2024.07.21  나경윤    Created
2024.08.07  나경윤    Modified    로그인 연결
2024.08.10  나경윤    Modified    네브바에서 토큰 처리
2024.08.10  임도헌    Modified   네브바 fiexd 적용
2024.09.11  임도헌    Modified   반응형 UI 적용
2024.09.13  임도헌    Modified   반응형 UI 수정
*/

'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import LoginNav from './LoginNav';
import { getUserInfo, postLogout } from '@/api/AuthApi';
import LogoutModal from '../auth/LogoutModal';

const JWT_EXPIRY_TIME = 15 * 60 * 1000;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Nav() {
    const pathname = usePathname();
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({
        nickname: '',
        profileImage: ''
    });
    const [isAuth, setIsAuth] = useState(false);
    const [isMobileMenuOpen, setIsMobilMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogoutConfirm = async () => {
        try {
            await postLogout();
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        } finally {
            setIsLogoutModalOpen(false);
        }
    };
    // 768px 이하를 모바일로 간주
    const isMobile = false;

    const isPay = pathname.startsWith('/pay');
    const isBuild = pathname.startsWith('/buildstory');
    const isMain = pathname === '/';

    useEffect(() => {
        // 현재 URL 해시 부분에서 토큰 추출
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');

        if (accessToken && refreshToken) {
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // 만료 시간 설정 및 저장
            const expiryTime = Date.now() + JWT_EXPIRY_TIME;
            localStorage.setItem('tokenExpiry', expiryTime.toString());

            // URL 해시 제거
            window.history.replaceState(null, '', window.location.pathname);
        }

        const fetchUserInfo = async () => {
            try {
                const data = await getUserInfo();

                localStorage.setItem('email', data.email);
                localStorage.setItem('nickname', data.nickname);
                localStorage.setItem('profileImage', data.profileImage);

                const storedNickName = localStorage.getItem('nickname') || '';
                const storedProfileImage =
                    localStorage.getItem('profileImage') || '';
                if (storedNickName) {
                    setIsAuth(true);

                    setUserInfo({
                        nickname: storedNickName,
                        profileImage: storedProfileImage
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const tokenExpiry = localStorage.getItem('tokenExpiry');

        const tokenExpiryTime = tokenExpiry ? parseInt(tokenExpiry, 10) : 0;

        // 토큰 유효성 확인
        if (token && tokenExpiry && Date.now() < tokenExpiryTime) {
            setIsAuth(true);
            setTimeout(refreshToken, tokenExpiryTime - Date.now() - 60000); // 만료 1분 전에 재발급
        } else {
            setIsAuth(false);
            if (
                pathname.startsWith('/buildstory') ||
                pathname.startsWith('/edit') ||
                pathname.startsWith('/mypage')
            ) {
                router.push('/login');
            }
        }
    }, [pathname, router]);

    const refreshToken = async () => {
        const token = localStorage.getItem('refreshToken');
        try {
            const response = await fetch(
                `${API_BASE_URL}/auth/regenerate-accesstoken`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        refreshToken: token
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('tokenExpiry');
                    router.push('/login');
                    return;
                }
                throw new Error(data.message || '토큰 재발급 실패');
            }

            onLoginSuccess(data.accessToken);
            // console.info('silent-success');
        } catch (error) {
            console.error(error);
        }
    };

    const onLoginSuccess = async (token: string) => {
        const expiryTime = Date.now() + JWT_EXPIRY_TIME;
        localStorage.setItem('accessToken', token);
        localStorage.setItem('tokenExpiry', expiryTime.toString());
        setIsAuth(true);
        setTimeout(refreshToken, JWT_EXPIRY_TIME - 60000); // 만료 1분 전에 재발급
    };

    /**
     * handleToggleMobileMenu: 모바일 반응형 메뉴
     */
    const handleToggleMobileMenu = () => {
        setIsMobilMenuOpen(!isMobileMenuOpen);
    };

    const handleCancel = () => {
        setIsLogoutModalOpen(false);
    };

    if (pathname === '/login') {
        return null;
    }

    return (
        <nav className="relative flex items-center justify-between h-[80px] text-lg shadow-md shadow-neutral-90 z-40">
            {/* 로고: 왼쪽 고정 */}
            <Link
                href="/"
                className="absolute left-1rem md:left-[6rem] cursor-pointer z-40"
            >
                <Image
                    src="/images/logo.svg"
                    alt="logo"
                    width={90}
                    height={0}
                />
            </Link>

            {/* 데스크탑 링크 */}
            <div className="hidden lg:flex space-x-20 absolute inset-x-0 justify-center z-30">
                <div className="flex items-center space-x-20">
                    <Link
                        href="/"
                        className={`hover:text-main cursor-pointer ${isMain ? 'text-main' : ''}`}
                    >
                        동화 갤러리
                    </Link>
                    <Link
                        href="/buildstory"
                        className={`hover:text-main cursor-pointer ${isBuild ? 'text-main' : ''}`}
                    >
                        동화 만들기
                    </Link>
                    <Link
                        href="/pay"
                        className={`hover:text-main cursor-pointer ${isPay ? 'text-main' : ''}`}
                    >
                        나뭇잎 충전
                    </Link>
                </div>
            </div>
            {/* 로그인 버튼 또는 LoginNav: 오른쪽 고정 */}
            <div className="hidden lg:flex absolute right-[6rem] cursor-pointer z-40">
                {isAuth ? (
                    <LoginNav
                        userInfo={userInfo}
                        handleToggleMobileMenu={handleToggleMobileMenu}
                        isMobile={false} // 데스크탑일 때
                    />
                ) : (
                    <Link
                        href="/login"
                        className="bg-main py-2 px-4 rounded-[7px] text-white cursor-pointer text-base"
                    >
                        로그인
                    </Link>
                )}
            </div>

            {/* 모바일 햄버거 메뉴 */}
            <div className="absolute right-6 z-40 lg:hidden">
                <button onClick={handleToggleMobileMenu} className="text-3xl">
                    ☰
                </button>
            </div>

            {/* 모바일 메뉴 */}
            {isMobileMenuOpen && (
                <div className="absolute top-20 flex flex-col items-center justify-center right-0 w-full h-screen bg-white z-50">
                    {isAuth ? (
                        <Link
                            href="/mypage"
                            className="py-4 text-xl hover:text-main"
                        >
                            마이페이지
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="py-4 text-xl hover:text-main"
                        >
                            로그인
                        </Link>
                    )}

                    <Link
                        href="/"
                        onClick={handleToggleMobileMenu}
                        className="py-4 text-xl hover:text-main"
                    >
                        동화 갤러리
                    </Link>
                    <Link
                        href="/buildstory"
                        onClick={handleToggleMobileMenu}
                        className="py-4 text-xl hover:text-main"
                    >
                        동화 만들기
                    </Link>
                    <Link
                        href="/pay"
                        onClick={handleToggleMobileMenu}
                        className="py-4 text-xl hover:text-main"
                    >
                        나뭇잎 충전
                    </Link>
                    {isAuth && (
                        <button
                            onClick={() => {
                                setIsLogoutModalOpen(true);
                            }}
                            className="py-4 text-xl hover:text-main"
                        >
                            로그아웃
                        </button>
                    )}
                    <LogoutModal
                        isOpen={isLogoutModalOpen}
                        onConfirm={handleLogoutConfirm}
                        onCancel={handleCancel}
                    />
                </div>
            )}
        </nav>
    );
}

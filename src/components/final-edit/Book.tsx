/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
/**
File Name : final-edit/Book
Description : 동화 편집 - 스토리를 책 모양으로 볼 수 있고 편집도 가능한 컴포넌트
Author : 임도헌

History
Date        Author   Status    Description
2024.07.23  임도헌    Created
2024.07.23  임도헌   Modified  모달기능 추가 및 코드 리팩토링
2024.07.30  임도헌   Modified  리액트 훅 폼 추가해야 될듯?
2024.07.31  임도헌   Modified  react-hook-form으로 코드 변경(아직 미완성)
2024.08.01  임도헌   Modified  portal 수정 및 전체 코드 변경
2024.08.02  임도헌   Modified  폼 제출 api 연결 및 creationWays 코드 추가
2024.08.02  임도헌   Modified  File 형태 폼제출 할 수 있도록 수정
2024.08.03  임도헌   Modified  코드 분리
2024.08.07  임도헌   Modified  fairytailId props 추가
2024.08.08  임도헌   Modified  eslint 에러 처리
*/

'use client';

import Image from 'next/image';
import { Controller } from 'react-hook-form';
import ImageModal from './ImageModal';
import StoryModal from './StoryModal';
import Toggle from '../common/Toggle';
import { ArrowIcon } from '../icons/ArrowIcon';
import { DropIcon } from '../icons/DropIcon';
import { themes } from '@/hooks/useFairytailForm';
import { useBook } from '@/hooks/useBook';
import { useBookModal } from '@/hooks/useModal';
import usePageLeaveCheck from '@/hooks/usePageLeaveCheck';
import Loading from '../common/Loading';

interface FairytailFormProps {
    fairytaleId?: number;
}

export default function Book({ fairytaleId = 0 }: FairytailFormProps) {
    const {
        register,
        handleSubmit,
        control,
        pages,
        cover,
        title,
        theme,
        currentPage,
        nickname,
        credit,
        loading,
        handlePrevPage,
        handleNextPage,
        handleImageSelect,
        handleStoryChange,
        updateCreationWay,
        onSubmit,
        handleBackButtonClick
    } = useBook(fairytaleId);

    const {
        imageModalOpen,
        storyModalOpen,
        setImageModalOpen,
        setStoryModalOpen
    } = useBookModal();

    // 페이지 나갈때 체크
    usePageLeaveCheck();

    if (loading) {
        return <Loading />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center mb-10">
                <div className="relative w-[1260px] flex items-center justify-between">
                    <div className="absolute left-[260px]">
                        <DropIcon rotate="" />
                    </div>
                    <select
                        className="w-[280px] m-4 p-2 pl-1 border border-green-300 rounded-lg shadow focus:outline-none focus:border-2 appearance-none"
                        id="theme"
                        {...register('theme', { required: true })}
                        defaultValue={theme}
                    >
                        <option value="">주제를 선택해주세요.</option>
                        {themes.map(({ name }) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <div className="flex items-center justify-center">
                        <div className="w-[120px]">
                            <Controller
                                name="isPublic"
                                control={control}
                                render={({ field }) => (
                                    <Toggle
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                        <div
                            onClick={handleBackButtonClick}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleBackButtonClick(e);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            className="flex justify-center items-center ml-2 w-[80px] h-[36px] text-base bg-main rounded-md font-bold text-white hover:bg-green-600"
                        >
                            뒤로가기
                        </div>
                        <button
                            type="submit"
                            className="ml-2 w-[60px] h-[36px] text-base bg-main rounded-md font-bold text-white hover:bg-green-600"
                        >
                            저장
                        </button>
                    </div>
                </div>
                <div className="">
                    <p className="mb-2 font-bold text-2xl">{title}</p>
                </div>

                <div className="flex justify-center items-center">
                    {/* 첫페이지면 화살표 작동 안함 */}
                    <button
                        type="button"
                        onClick={handlePrevPage}
                        disabled={currentPage === 0}
                        className=""
                    >
                        <ArrowIcon rotate="180" />
                    </button>
                    {/* 첫페이지면 표지임. 아니면 표지가 아니라 페이지를 보여준다. */}
                    <div className="w-[40px] h-[600px] flex items-end justify-end mr-2">
                        <div className="text-lg font-bold">
                            {currentPage === 0
                                ? '표지 뒷면'
                                : currentPage + currentPage - 1}
                        </div>
                    </div>
                    <div className="flex w-[600px] h-[600px] border-2 justify-center">
                        {/* 만약 페이지가 0이면 북 커버를 보여줘야 함 API 호출은 나중에 */}
                        {currentPage === 0 ? (
                            <div className="flex flex-col justify-center items-center">
                                <button
                                    type="button"
                                    onClick={() => setImageModalOpen(true)}
                                    className="relative flex justify-center items-center group w-[300px] h-[300px] bg-[#D9D9D9] rounded-[2px] text-main font-bold hover:opacity-60 hover:bg-gray-300"
                                >
                                    {cover ? (
                                        typeof cover === 'string' ? (
                                            <Image
                                                src={cover}
                                                width={300}
                                                height={300}
                                                alt="bookCover"
                                                className="object-cover w-full h-full mx-auto bg-white"
                                            />
                                        ) : (
                                            <Image
                                                src={URL.createObjectURL(cover)}
                                                width={300}
                                                height={300}
                                                alt="bookCover"
                                                className="object-cover w-full h-full mx-auto bg-white"
                                            />
                                        )
                                    ) : (
                                        <div className="w-[300px] h-[300px] flex flex-col items-center justify-center">
                                            <Image
                                                src="/images/BiImageAlt.svg"
                                                width={200}
                                                height={200}
                                                alt="defaultBookCover"
                                                className="object-fit w-[200px] h-[200px]"
                                            />
                                            <p>클릭해서 이미지 생성</p>
                                        </div>
                                    )}
                                    <div className="p-2 mt-2 invisible group-hover:visible absolute text-white bg-gray-600 rounded-md">
                                        클릭하면 이미지 생성이 가능합니다.
                                    </div>
                                </button>
                            </div>
                        ) : (
                            // 만약 페이지가 0이아니라면 각페이지에 동화 이미지를 넣는다.
                            <button
                                type="button"
                                onClick={() => setImageModalOpen(true)}
                                className="relative flex justify-center items-center group w-[600px] h-[600px] bg-[#D9D9D9] rounded-[2px] text-main font-bold hover:opacity-60 hover:bg-gray-300"
                            >
                                {pages[currentPage - 1]?.image ? (
                                    <div className="absolute top-0 left-0 w-full h-full">
                                        {typeof pages[currentPage - 1].image ===
                                        'string' ? (
                                            <Image
                                                src={
                                                    pages[currentPage - 1]
                                                        .image as string
                                                }
                                                width={600}
                                                height={600}
                                                alt={`Page ${currentPage}`}
                                                className="object-cover w-full h-full mx-auto bg-white"
                                            />
                                        ) : (
                                            <Image
                                                src={URL.createObjectURL(
                                                    pages[currentPage - 1]
                                                        .image as File
                                                )}
                                                width={600}
                                                height={600}
                                                alt={`Page ${currentPage}`}
                                                className="object-cover w-full h-full mx-auto bg-white"
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        <Image
                                            src="/images/BiImageAlt.svg"
                                            width={300}
                                            height={300}
                                            alt={`Default Page ${currentPage}`}
                                        />
                                        <p>클릭해서 이미지 생성</p>
                                    </div>
                                )}
                                <div className="p-2 mt-2 invisible group-hover:visible absolute text-white bg-gray-600 rounded-md">
                                    클릭하면 이미지 생성이 가능합니다.
                                </div>
                            </button>
                        )}
                    </div>
                    {/* 책의 제목과 지은이 꿈틀 로고 들어감 */}
                    <div className="w-[60px] h-[600px] border-2 flex flex-col justify-between items-center">
                        <p className="texto mt-10 text-xl">{title}</p>
                        <p className="texto text-lg">{nickname} 지음</p>
                        <Image
                            src="/images/logo.svg"
                            alt="logo"
                            width={50}
                            height={50}
                            className="mb-10"
                        />
                    </div>
                    <div className="flex w-[600px] h-[600px] border-2 justify-center">
                        {/* page가 0이면 표지이며 표지에 관련된 내용이 나와야 한다. */}
                        {currentPage === 0 ? (
                            <div className="flex flex-col items-center">
                                <button
                                    type="button"
                                    onClick={() => setImageModalOpen(true)}
                                    className="relative flex justify-center items-center group w-[600px] h-[500px] bg-[#D9D9D9] rounded-[2px] text-main font-bold hover:opacity-60 hover:bg-gray-300 overflow-hidden"
                                >
                                    {cover ? (
                                        <div className="absolute top-0 left-0 w-full h-full">
                                            {typeof cover === 'string' ? (
                                                <Image
                                                    src={cover}
                                                    width={400}
                                                    height={400}
                                                    alt="bookCover"
                                                    className="object-cover w-full h-full mx-auto bg-white"
                                                />
                                            ) : (
                                                <Image
                                                    src={URL.createObjectURL(
                                                        cover
                                                    )}
                                                    width={400}
                                                    height={400}
                                                    alt="bookCover"
                                                    className="object-cover w-full h-full mx-auto bg-white"
                                                />
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <Image
                                                src="/images/BiImageAlt.svg"
                                                width={300}
                                                height={300}
                                                alt="Default BookCover"
                                            />
                                            <p>클릭해서 이미지 생성</p>
                                        </div>
                                    )}
                                    <div className="p-2 mt-2 invisible group-hover:visible absolute text-white bg-gray-600 rounded-md">
                                        클릭하면 이미지 생성이 가능합니다.
                                    </div>
                                </button>
                                <p className="text-3xl font-bold mt-2">
                                    {title}
                                </p>
                                <p className="text-sm mt-4">{nickname} 지음</p>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setStoryModalOpen(true)}
                                className="group flex justify-center items-center w-[600px] h-[600px] border font-bold p-2 hover:opacity-60 hover:bg-gray-300 "
                            >
                                <div className="w-[400px] text-lg">
                                    {pages[currentPage - 1]?.story}
                                </div>
                                <div className="p-2 mt-2 invisible group-hover:visible absolute text-white bg-gray-600 rounded-md ">
                                    클릭하면 내용 편집이 가능합니다.
                                </div>
                            </button>
                        )}
                    </div>
                    {/* 첫페이지면 표지임. 아니면 표지가 아니라 페이지를 보여준다. */}
                    <div className="w-[40px] h-[600px] flex items-end justify-start ml-2">
                        <div className="text-lg font-bold">
                            {currentPage === 0
                                ? '표지 앞면'
                                : currentPage + currentPage}
                        </div>
                    </div>
                    {/* 마지막 페이지 일 시 넘기는 버튼 뜨지 않는다. */}

                    <button
                        type="button"
                        onClick={handleNextPage}
                        disabled={currentPage === pages.length}
                    >
                        <ArrowIcon rotate="0" />
                    </button>
                </div>
            </div>
            {imageModalOpen && (
                <ImageModal
                    credit={credit}
                    title={title}
                    currentPage={currentPage}
                    updateCreationWay={updateCreationWay}
                    onClose={() => setImageModalOpen(false)}
                    onImageSelect={handleImageSelect}
                    initialText={pages[currentPage - 1]?.story}
                />
            )}
            {storyModalOpen && (
                <StoryModal
                    initialText={pages[currentPage - 1]?.story || ''}
                    onClose={() => setStoryModalOpen(false)}
                    onChange={handleStoryChange}
                />
            )}
        </form>
    );
}

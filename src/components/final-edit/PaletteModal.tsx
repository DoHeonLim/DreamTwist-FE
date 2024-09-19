/**
File Name : compoenents/final-edit/PaletteModal
Description : 그림판 모달
Author : 임도헌

History
Date        Author   Status      Description
2024.07.24  임도헌   Created
2024.07.24  임도헌   Modified    그림판 모달 추가
2024.07.27  임도헌   Modified    portal 적용
2024.07.29  임도헌   Modified    필요없는 코드 삭제
2024.07.30  임도헌   Modified    스타일 적용
2024.08.01  임도헌   Modified    portal 수정 및 코드 리팩토링
2024.08.02  임도헌   Modified    creationWays 코드 추가 및 이미지를 File로 변경 후 File 형태 폼제출 할 수 있도록 수정
2024.08.03  임도헌   Modified    코드 분리
2024.08.05  임도헌   Modified    colorOptions 분리
2024.08.08  임도헌   Modified    eslint 에러 처리
2024.09.19  임도헌   Modified    반응형 UI 수정
*/

import React from 'react';
import Image from 'next/image';
import Portal from '../common/Portal';
import { colorOptions, useCanvas } from '@/hooks/useCanvas';

interface PaletteModalProps {
    onClose: () => void;
    handleDrawingUpload: (image: File) => void;
}

export default function PalleteModal({
    onClose,
    handleDrawingUpload
}: PaletteModalProps) {
    const {
        canvasRef,
        containerRef,
        fileInputRef,
        textInputRef,
        containerLength,
        color,
        isFilling,
        lineWidth,
        setColor,
        handleMouseMove,
        handleMouseDown,
        handleMouseUp,
        handleLineWidthChange,
        handleColorChange,
        handleModeClick,
        handleCanvasFillClick,
        handleClearClick,
        handleEraserClick,
        handleFileClick,
        handleFileChange,
        handleDoubleClick,
        handleDrawingComplete
    } = useCanvas();

    return (
        <Portal>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[512px] md:w-[700px] lg:w-[1000px] h-auto bg-white rounded-lg shadow-lg p-6 z-50">
                <div className="flex flex-col lg:flex-row justify-center items-center w-auto h-auto">
                    <div className="flex flex-col lg:flex-row justify-center items-center w-auto space-x-0 lg:space-x-4 mb-4">
                        <div className="flex sm:hidden justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="ml-auto block"
                            >
                                <Image
                                    src="/images/cancleIcon.svg"
                                    width={40}
                                    height={40}
                                    alt="cancel"
                                />
                            </button>
                        </div>
                        <div className="flex space-x-4 md:space-x-8 lg:space-x-2 mb-4 lg:mb-0 justify-center items-center">
                            <button
                                type="button"
                                className="p-1 md:p-4 bg-gray-200 rounded-md flex-none"
                                onClick={handleModeClick}
                            >
                                {isFilling ? (
                                    <Image
                                        src="/images/Brush.svg"
                                        width={36}
                                        height={36}
                                        alt="brush"
                                    />
                                ) : (
                                    <Image
                                        src="/images/Paint.svg"
                                        width={36}
                                        height={36}
                                        alt="paint"
                                    />
                                )}
                            </button>
                            <button
                                type="button"
                                className="p-1 md:p-4 bg-gray-200 rounded-md flex-none"
                                onClick={handleEraserClick}
                            >
                                <Image
                                    src="/images/Eraser.svg"
                                    width={36}
                                    height={36}
                                    alt="eraser"
                                />
                            </button>
                            <div className="flex lg:hidden">
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <button
                                    className="p-1 md:p-4 bg-gray-200 rounded-md flex-none"
                                    type="button"
                                    onClick={handleFileClick}
                                >
                                    <Image
                                        src="/images/PalettePicture.svg"
                                        width={36}
                                        height={36}
                                        alt="picture"
                                    />
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={handleClearClick}
                                className="flex lg:hidden p-1 md:p-4 bg-gray-200 rounded-md flex-none"
                            >
                                <Image
                                    src="/images/Outline.svg"
                                    width={36}
                                    height={36}
                                    alt="clear"
                                />
                            </button>
                            <div className="hidden sm:flex lg:hidden justify-end">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="ml-auto block mb-4 mt-5"
                                >
                                    <Image
                                        src="/images/cancleIcon.svg"
                                        width={40}
                                        height={40}
                                        alt="cancel"
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
                            <div className="flex justify-center items-center flex-none">
                                <input
                                    className="w-[200px] accent-main"
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={lineWidth}
                                    step="0.1"
                                    onChange={handleLineWidthChange}
                                />
                            </div>
                            <div className="flex justify-center items-center flex-none">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={handleColorChange}
                                    className="w-[50px] h-10 border-none mr-4"
                                />
                                <div className="grid grid-cols-5 gap-5">
                                    {colorOptions.map((colorOption) => (
                                        <div
                                            key={colorOption}
                                            role="button"
                                            tabIndex={0}
                                            aria-label={`Select color ${colorOption}`}
                                            className="w-8 h-8 rounded-lg border-[1px]"
                                            style={{
                                                backgroundColor: colorOption
                                            }}
                                            onClick={() => {
                                                setColor(colorOption);
                                            }}
                                            onKeyPress={(e) => {
                                                if (
                                                    e.key === 'Enter' ||
                                                    e.key === ' '
                                                ) {
                                                    setColor(colorOption);
                                                }
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:flex lg:flex-row md:space-x-8 lg:space-x-2">
                            <div className="flex">
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <button
                                    className="p-1 md:p-4 bg-gray-200 rounded-md flex-none"
                                    type="button"
                                    onClick={handleFileClick}
                                >
                                    <Image
                                        src="/images/PalettePicture.svg"
                                        width={36}
                                        height={36}
                                        alt="picture"
                                    />
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={handleClearClick}
                                className="p-1 md:p-4 bg-gray-200 rounded-md flex-none"
                            >
                                <Image
                                    src="/images/Outline.svg"
                                    width={36}
                                    height={36}
                                    alt="clear"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="hidden lg:flex justify-end mb-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="ml-auto block mb-4 mt-5"
                        >
                            <Image
                                src="/images/cancleIcon.svg"
                                width={40}
                                height={40}
                                alt="cancel"
                            />
                        </button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div
                        ref={containerRef}
                        className="flex justify-center items-center w-[256px] h-[256px] sm:w-[480px] sm:h-[480px] md:w-[600px] md:h-[600px]"
                    >
                        <canvas
                            className="border-2 border-gray-300 m-4"
                            ref={canvasRef}
                            width={containerLength.width}
                            height={containerLength.height}
                            onMouseMove={handleMouseMove}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onClick={handleCanvasFillClick}
                            onDoubleClick={handleDoubleClick}
                        />
                    </div>
                </div>
                <div className="flex justify-around mt-5 md:mt-4">
                    <div>
                        <input
                            type="text"
                            placeholder="텍스트를 입력해주세요"
                            ref={textInputRef}
                            className="w-[200px] border p-2 rounded-md"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() =>
                            handleDrawingComplete(handleDrawingUpload)
                        }
                        className="px-4 py-2 bg-main text-white rounded-md flex-none"
                    >
                        저장
                    </button>
                </div>
            </div>
        </Portal>
    );
}

/**
File Name : hooks/useCanvas
Description : usePaletteModal에서 사용하는 훅
Author : 임도헌

History
Date        Author   Status    Description
2024.08.03  임도헌   Created
2024.08.03  임도헌   Modified  캔버스훅 추가
2024.08.05  임도헌   Modified  colorOptions 분리
2024.09.19  임도헌   Modified  캔버스 반응형 UI 수정
*/

import { useRef, useState, useEffect, useCallback } from 'react';

const CANVAS_LINE: number = 5;

export const colorOptions = [
    '#FF0000',
    '#FF6B00',
    '#FFE500',
    '#22F400',
    '#000000',
    '#0085FF',
    '#3C0F9C',
    '#BD00FF',
    '#FF70D7',
    '#FFFFFF'
];

export const useCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textInputRef = useRef<HTMLInputElement>(null);

    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [isPainting, setIsPainting] = useState<boolean>(false);
    const [isFilling, setIsFilling] = useState<boolean>(false);
    const [lineWidth, setLineWidth] = useState<number>(0);
    const [color, setColor] = useState<string>('#000000');
    const [containerLength, setContainerLength] = useState({
        width: 0,
        height: 0
    });

    const updateDimensions = useCallback(() => {
        if (containerRef.current) {
            const { clientWidth, clientHeight } = containerRef.current;
            setContainerLength({
                width: clientWidth,
                height: clientHeight
            });
        }
    }, []);

    useEffect(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        // 초기 크기 설정을 위한 setTimeout
        const timer = setTimeout(updateDimensions, 0);

        return () => {
            window.removeEventListener('resize', updateDimensions);
            clearTimeout(timer);
        };
    }, [updateDimensions]);

    useEffect(() => {
        setLineWidth(CANVAS_LINE);
    }, []);

    useEffect(() => {
        if (
            canvasRef.current &&
            containerLength.width > 0 &&
            containerLength.height > 0
        ) {
            const canvas = canvasRef.current;
            const newCtx = canvas.getContext('2d');

            if (
                newCtx &&
                (!ctx ||
                    canvas.width !== containerLength.width ||
                    canvas.height !== containerLength.height)
            ) {
                // 기존 그림 저장
                const imageData = ctx?.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

                // 캔버스 크기 조정
                canvas.width = containerLength.width;
                canvas.height = containerLength.height;

                // 기존 그림 복원
                if (imageData) {
                    newCtx.putImageData(imageData, 0, 0);
                }

                setCtx(newCtx);
            }
        }
    }, [containerLength, ctx]);

    useEffect(() => {
        if (ctx) {
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
        }
    }, [ctx, lineWidth, color]);

    /**
     * handleMouseMove: 마우스 좌표를 이용해서 선 그리는 함수
     * @description 마우스 누른 상태면 isPainting이 true가 되므로 선 그리기가 된다.
     */
    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (isPainting && ctx) {
            const rect = canvasRef.current?.getBoundingClientRect();
            const x = event.clientX - (rect?.left || 0);
            const y = event.clientY - (rect?.top || 0);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    };

    /** handleMouseDown: 마우스 누른 상태
     * @description 마우스를 누른 상태면 isPainting이 true가 된다. 이 상태를 이용해서 handleMouseMove를 사용한다.
     */
    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (ctx) {
            setIsPainting(true);
            const rect = canvasRef.current?.getBoundingClientRect();
            const x = event.clientX - (rect?.left || 0);
            const y = event.clientY - (rect?.top || 0);
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    };

    /** handleMouseUp: 마우스 뗀 상태
     * @description 마우스를 떼면 isPainting이 false가 된다. 이 상태를 이용해서 handleMouseMove가 작동하지 않는다.
     */
    const handleMouseUp = () => {
        setIsPainting(false);
        if (ctx) {
            ctx.beginPath();
        }
    };

    /** handleLineWidthChange: 선 굵기 변화를 감지 */
    const handleLineWidthChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLineWidth(Number(event.target.value));
    };

    /** handleColorChange: 색 변화를 감지 */
    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value);
    };

    /** handleModeClick: 펜모드와 채우기 모드 체크 */
    const handleModeClick = () => {
        setIsFilling(!isFilling);
    };

    /** handleModeClick: 채우기 모드일때 */
    const handleCanvasFillClick = () => {
        if (isFilling && ctx) {
            ctx.fillRect(0, 0, containerLength.width, containerLength.height);
        }
    };

    /** handleClearClick: 그림판 초기화 기능
     *  @description 캔버스 화면을 하얀색으로 채우는 방식으로 구현
     */
    const handleClearClick = () => {
        if (window.confirm('정말 그림을 지우시겠습니까?')) {
            if (ctx) {
                ctx.clearRect(
                    0,
                    0,
                    containerLength.width,
                    containerLength.height
                );
                ctx.fillStyle = 'white';
                ctx.fillRect(
                    0,
                    0,
                    containerLength.width,
                    containerLength.height
                );
            }
        }
    };

    /** handleEraserClick: 지우개 기능
     *  @description 하얀색 펜으로 지우는 기능 제공 만약 채우기 모드일때는 펜모드로 바꾼다.
     */
    const handleEraserClick = () => {
        setColor('white');
        setIsFilling(false);
    };

    /** handleFileClick: 파일 인풋 버튼으로 커스텀
     *  @description file input 없애고 지정한 버튼에 file input 연결시킨다.
     */
    const handleFileClick = () => {
        fileInputRef?.current?.click();
    };

    /** handleFileChange: 이미지 첨부 기능
     *  @description 파일을 url로 바꾸고 img 태그 생성해서 src 넣어주는 방식 넣어준 뒤 value 초기화 시켜서 다른
     * 페이지에 이미지 첨부시 기존 파일 초기화 시켜줘야 다시 넣기 가능
     */
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && ctx) {
            const url = URL.createObjectURL(file);
            const image = document.createElement('img');
            image.src = url;
            image.onload = () => {
                ctx.drawImage(
                    image,
                    0,
                    0,
                    containerLength.width,
                    containerLength.height
                );
                URL.revokeObjectURL(url);
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; // Reset file input after image load
                }
            };
        }
    };

    /** handleDoubleClick: 글씨 넣기 기능
     *  @description 현재 상태를 저장 후 선 굵기 1로 세팅, 폰트 세팅, 텍스트 넣은 뒤 기존 상태 다시 불러온다.
     */
    const handleDoubleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const text = textInputRef.current?.value;
        if (text && ctx) {
            ctx.save();
            ctx.lineWidth = 1;
            ctx.font = '68px Arial'; // Use Arial as 'pretendard' may not be available
            ctx.fillText(
                text,
                event.nativeEvent.offsetX,
                event.nativeEvent.offsetY
            );
            ctx.restore();
        }
    };

    /** handleDrawingComplete: 글씨 넣기 기능
     *  @description 저장 버튼 시 현재 이미지 데이터를 form으로 보낸다.
     */
    const handleDrawingComplete = (
        handleDrawingUpload: (image: File) => void
    ) => {
        if (canvasRef.current) {
            canvasRef.current.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], 'drawing.png', {
                        type: 'image/png'
                    });
                    handleDrawingUpload(file);
                }
            });
        }
    };

    return {
        canvasRef,
        containerRef,
        fileInputRef,
        textInputRef,
        ctx,
        color,
        isFilling,
        lineWidth,
        containerLength,
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
    };
};

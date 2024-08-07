import Sample2 from '../../public/images/sample2.svg';

export interface Book {
    id: number;
    title: string;
    author: string;
}

export const dummyBooks = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `뽀로로와 지구온난화 ${i + 1}`,
    author: `김민규 작가 ${i + 1}`
}));

export const contents: string[] = [
    '작은 마을의 고양이 마을에는 모두가 사랑하는 용감한 고양이 미미가 살고 있었어요. 미미는 하얀 털과 큰 파란 눈을 가진 아름다운 고양이였어요. 마을의 모든 고양이들은 미미를 좋아했어요. 왜냐하면 미미는 언제나 친절하고 용감했기 때문이에요.',
    '미미는 친구들과 함께 악당 쥐들을 물리치기 위한 계획을 세우기로 했어요. 미미의 가장 친한 친구는 검은 털을 가진 고양이 루루였어요. 루루는 빠르고 민첩했어요. 그리고 회색 털을 가진 고양이 토토도 있었어요.',
    '미미와 친구들은 먼저 마을을 둘러보며 쥐들이 어디에 숨어 있는지 알아보기로 했어요. 루루는 높은 나무 위로 올라가 마을을 내려다보며 쥐들의 움직임을 관찰했어요. 토토는 마을의 구석구석을 돌아다니며 쥐들이 자주 다니는 길을 찾아냈어요.',
    '함정을 설치하는 동안 미미와 친구들은 서로를 격려하며 힘을 냈어요. 루루는 나무에서 내려와 함정을 설치하는 데 도움을 주었고, 토토는 함정의 위치를 정확하게 정했어요. 미미는 친구들이 잘 하고 있는지 확인하며, 필요한 도움을 주었어요.',
    '미미는 마을을 지키기 위해 용감하게 나서기로 결심했어요. 미미는 친구들과 함께 악당 쥐들을 물리치기 위한 계획을 세우고, 그 과정에서 많은 어려움을 겪게 돼요.',
    '하지만 미미는 포기하지 않고 끝까지 싸워 마침내 악당 쥐들을 물리치게 되는데... 과연 미미는 어떻게 마을을 지킬 수 있을까요?'
];

export const sampleImages = Array.from({ length: 10 }, (_, i) => ({
    coverImage: `/images/sample2.svg`
}));

export const dummyComments = [
    {
        id: '1',
        username: 'user123',
        date: '2024-08-01',
        content: '재밌네용',
        profile: '/images/sample2.svg'
    },
    {
        id: '2',
        username: '안녕',
        date: '2024-08-02',
        content: '잘 읽고 갑니다',
        profile: '/images/sample2.svg'
    },
    {
        id: '3',
        username: '회원2',
        date: '2024-08-02',
        content: '좋아요',
        profile: '/images/sample2.svg'
    },
    {
        id: '4',
        username: '달걀',
        date: '2024-08-02',
        content: '명작이네요',
        profile: '/images/sample2.svg'
    },
    {
        id: '5',
        username: '하하',
        date: '2024-08-02',
        content: '웃기당',
        profile: '/images/sample2.svg'
    }
];

export const dummyMyComments = [
    {
        id: '1',
        fairytaleId: '1',
        date: '2024-08-01',
        content: '재밌네용',
        title: '철학자와 신비한 마을'
    },
    {
        id: '2',
        fairytaleId: '2',
        date: '2024-08-02',
        content: '222222',
        title: '신비아파트'
    },
    {
        id: '3',
        fairytaleId: '3',
        date: '2024-08-03',
        content: '추천',
        title: '수상한 빨간 망토'
    },
    {
        id: '1',
        fairytaleId: '1',
        date: '2024-08-01',
        content: '재밌네용',
        title: '철학자와 신비한 마을'
    },
    {
        id: '2',
        fairytaleId: '2',
        date: '2024-08-02',
        content: '222222',
        title: '신비아파트'
    },
    {
        id: '3',
        fairytaleId: '3',
        date: '2024-08-03',
        content: '추천',
        title: '수상한 빨간 망토'
    },
    {
        id: '1',
        fairytaleId: '1',
        date: '2024-08-01',
        content: '재밌네용',
        title: '철학자와 신비한 마을'
    },
    {
        id: '2',
        fairytaleId: '2',
        date: '2024-08-02',
        content: '222222',
        title: '신비아파트'
    },
    {
        id: '3',
        fairytaleId: '3',
        date: '2024-08-03',
        content: '추천',
        title: '수상한 빨간 망토'
    }
];

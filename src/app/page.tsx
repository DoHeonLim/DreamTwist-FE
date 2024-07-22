import Link from 'next/link';

function HomePage() {
    return (
        <div>
            <h1 className="text-7xl">홈 페이지</h1>
            <Link
                href="/buildstory"
                className="text-xl text-green-custom inline-block mt-8"
            >
                Build Story
            </Link>
        </div>
    );
}
export default HomePage;

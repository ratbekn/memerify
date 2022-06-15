import Link from 'next/link';

interface HeaderProps {
    username: string
}

function Header({username}: HeaderProps) {
    return (
        <div className="flex-[2]
                        border-r
                        border-l
                        border-[#38444d]
                        text-white">
            <div className="sticky
                            top-0
                            bg-[#15202b]
                            z-10
                            p-4
                            flex
                            justify-between
                            items-center">
                <div className="flex-1 flex gap-1">
                    <Link className="text-xl
                                font-bold mr-2" href="/">
                        Home
                    </Link>
                    <Link className="text-xl font-bold" href="/users">
                        Users
                    </Link>
                </div>
                <div className="flex-3">
                    <div>
                        {username}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;

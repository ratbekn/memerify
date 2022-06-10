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
                <div className="text-xl
                                font-bold">
                    Home
                </div>
                <div className="">
                    <div>
                        {username}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;

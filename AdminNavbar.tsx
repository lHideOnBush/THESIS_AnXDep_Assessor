export default function AdminNavbar() {
    return <nav className="bg-gray-800">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <span className="text-white font-semibold text-lg">Assessing Anxiety</span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="font-semibold">
                        <span className="text-white">Admin</span>
                    </div>
                </div>
            </div>
        </div>
    </nav>
}
export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center h-10 w-10 animate-spin rounded-full border-4 border-t-4 border-blue-600">
                <div className="loader mb-4"></div>
                <p className="text-lg text-muted">Loading sacrament meetings...</p>
            </div>
        </div>
    );
}
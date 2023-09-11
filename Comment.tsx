
export default function CommentBox({ comment, setComment }: { comment: string, setComment: any }) {
    return <>
        <form>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="px-4 py-2 bg-white rounded-t-lg ">
                    <label htmlFor="comment" className="text-xl m-5">Life Anxiety or Depression Inquiry 🤗</label>
                    <div className="h-4"></div>
                    <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} rows={4} className="w-full p-5 text-base text-gray-900 bg-white border-2 rounded-md" placeholder="How have you been feeling lately? Have you noticed any changes in your mood or emotions?" required></textarea>
                </div>
            </div>
        </form>
    </>
}
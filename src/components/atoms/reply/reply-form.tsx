export const ReplyForm = () => {
  return (
    <form className="space-y-2">
      <textarea
        placeholder="댓글을 입력하세요."
        className="w-full p-2 border rounded h-20 resize-none"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        등록
      </button>
    </form>
  );
};

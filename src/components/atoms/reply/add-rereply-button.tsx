'use client';

export const AddRereplyButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex justify-center border-t border-black py-1">
      <button
        className="border-b border-black cursor-pointer"
        onClick={onClick}
      >
        대댓글 달기
      </button>
    </div>
  );
};

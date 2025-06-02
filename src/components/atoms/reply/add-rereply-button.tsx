'use client';

export const AddRereplyButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex justify-center border-t border-black">
      <button className=" border-b border-black" onClick={onClick}>
        대댓글 달기
      </button>
    </div>
  );
};

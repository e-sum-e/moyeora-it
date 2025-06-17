'use client';

import { ParticipantListModal } from "@/components/organisms/participant-list-modal";
import { Button } from "@/components/ui/button";
import { StarRating } from "../star-rating";
import { setRating } from "@/features/rating";
import { toast } from "sonner";
import { UserSummary } from "@/types";


type RateButtonProps = {
  participants: UserSummary[];
}

const triggerButton = () => {
  return (
    <Button 
      className="text-sm cursor-pointer font-semibold bg-green-500 text-white"
    >
      팀원 별점 등록하기
    </Button>
  )
}

export const RateButton = ({ participants }: RateButtonProps) => {
  if(!participants) {
    return null;
  }
  return (
    <div>
      <ParticipantListModal
        participants={participants}
        trigger={triggerButton()}
        onClose={() => {
          toast.success('별점 등록이 완료되었습니다.', {
            duration: 2000,  
          });
        }}
        renderParticipant={(participant) => (
          <StarRating
            initialRating={participant.rate}
            sendRating={(rating) => {
              console.log(`User ${participant.userId} rating:`, rating);
              // TODO: API 호출하여 별점 저장
              setRating(participant.userId, rating);
            }}
          />
        )}
      />
    </div>
  );
};

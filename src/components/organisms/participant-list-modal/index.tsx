import { ParticipantCard } from '@/components/molecules/participant-card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { User } from '@/types';
import { PlusIcon } from 'lucide-react';

type ParticipantListModalProps = {
  participants: Pick<User, 'userId' | 'nickname' | 'profileImage'>[];
};

export const ParticipantListModal = ({
  participants,
}: ParticipantListModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full border p-2 ">
          <PlusIcon className="w-3 h-3" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] p-0">
        <DialogHeader className="sticky top-0 z-10 bg-white p-4 border-b">
          <DialogTitle>참여자 목록</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[60vh] px-4 py-2">
          <div className="grid gap-4">
            {participants.map((participant, i) => (
              <ParticipantCard key={i} {...participant} />
            ))}
          </div>
        </div>
        <DialogFooter className="p-4">
          <DialogClose asChild>
            <Button>확인</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

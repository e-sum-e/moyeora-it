import { PositionBadge } from '@/components/molecules/position-badge';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { DEFAULT_POSITION_NAMES, PositionName, WriteForm } from '@/types';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

type SelectPositionProps = {
  form: UseFormReturn<WriteForm>;
};

export const SelectPosition = ({ form }: SelectPositionProps) => {
  const [selectedPositions, setSelectedPositions] = useState<PositionName[]>(
    [],
  );

  const positionClickHandler = (position: PositionName) => {
    const isSelected = selectedPositions.find(
      (selectedSkill) => selectedSkill === position,
    );

    // toggle. 지금 선택한 스킬이 이미 선택되어 있었다면 제외돼야 함
    if (isSelected) {
      const nextSelectedPositions = selectedPositions.filter(
        (selectedSkill) => selectedSkill !== position,
      );

      setSelectedPositions(nextSelectedPositions);
      form.setValue('positions', nextSelectedPositions);
    } else {
      const nextSelectedPositions = [...selectedPositions, position];

      setSelectedPositions(nextSelectedPositions);
      form.setValue('positions', nextSelectedPositions);
    }
  };
  console.log(selectedPositions);
  return (
    <>
      <FormField
        control={form.control}
        name="positions"
        render={({}) => (
          <FormItem>
            <FormLabel>모집할 포지션을 선택해주세요.</FormLabel>
            <FormControl>
              <ul className="flex gap-2">
                {DEFAULT_POSITION_NAMES.map((position, i) => (
                  <li
                    key={i}
                    className={
                      selectedPositions.includes(position)
                        ? '[&_.position-badge]:border-3 [&_.position-badge]:border-green-500'
                        : ''
                    }
                  >
                    <button
                      type="button"
                      onClick={() => {
                        positionClickHandler(position);
                      }}
                    >
                      <PositionBadge name={position} />
                    </button>
                  </li>
                ))}
              </ul>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

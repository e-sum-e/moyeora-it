export enum Position {
  'PM',
  'PL',
  'AA',
  'TA',
  'DA',
  'QA',
  'FE',
  'BE',
  'FS',
}

export enum Skill {
  'Java',
  'JavaScript',
  'HTML_CSS',
  'REACT',
  'Vue',
  'Kotlin',
  'Spring',
}

/** 알림 타입 */
export enum eNotification {
  GROUP_HAS_PARTICIPANT, // 내가 작성한 글에 참여자 생김 -> 신청 수락 페이지
  CONFIRMED_PARTICIPANT_CANCELED, // 확정 참여자 취소 -> 상세페이지
  APPLY_APPROVED, // 내가 신청한 모임 승인-> 상세페이지
  APPLY_REJECTED, // 내가 신청한 모임 거절 -> x
  FULL_CAPACITY, // 모임 정원 마감-> 상세페이지
  FOLLOWER_ADDED, // 팔로워 추가된 경우 알람 -> 유저 상세 페이지
  APPLY_CANCELED, // 내가 신청한 모임 취소 -> x
  COMMENT_RECEIVED, // 댓글 달린 경우 -> 해당 페이지 댓글로 바로, 상세페이지 id랑, 해당 댓글 id 필요
  FOLLOWER_CREATE_GROUP, // 팔로워가 모임을 만든 경우 알람 -> 상세페이지
  REJECTED_GROUP, // 모임 신청이 거절된 경우
  WITHIN_24_HOUR, // 북마크한 모임이 24시간 남은 경우 알람 -> 상세페이지
}

export function getPosition(position: Position): string {
  return Position[position];
}

export function getSkill(skill: Skill): string {
  return Skill[skill];
}

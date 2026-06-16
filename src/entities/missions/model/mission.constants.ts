export const missionQueryKeys = {
  myMissions: ['my-missions'],
  todayMissions: ['today-missions'],
} as const;

export const MISSION_TOAST_MESSAGES = {
  completeSuccess: '미션 완료! 마이로그 작성이 완료되었어요.',
  skipSuccess: '미션 완료! 오늘도 한 걸음 나아갔어요.',
  uploadError: '사진 업로드에 실패했어요. 다시 시도해주세요.',
  mylogError: '마이로그 작성에 실패했어요. 다시 시도해주세요.',
  completeError: '미션 완료에 실패했어요. 다시 시도해주세요.',
} as const;

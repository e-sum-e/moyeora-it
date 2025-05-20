/**
 * 이미지 파일 유효성 검사
 * 
 * 다음 조건을 만족해야 유효한 이미지로 간주
 * - MIME 타입이 image/로 시작해야 함
 * - 파일 크기가 maxFileSize 이하여야 이미지 파일이 유효함
 * 
 * @param file 검사할 이미지 파일
 * @param maxFileSize 최대 파일 크기(기본값: 5MB)
 * @returns 위 조건을 만족하는 경우 true, 그렇지 않은 경우 false
*/
export const isValidImageFile = (file: File, maxFileSize = 5 * 1024 * 1024) => {
  if (!file.type.startsWith("image/")) {
    return false;
  }

  const fileSize = file.size;

  if (fileSize > maxFileSize) {
    return false;
  }

  return true;
};

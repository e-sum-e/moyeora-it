/**
 * 이미지 파일 유효성 검사
 * 
 * 다음 조건을 만족해야 유효한 이미지로 간주
 * - MIME 타입이 image/로 시작해야 함
 * - 파일 크기가 5MB 이하여야 함
 * 
 * @param file 검사할 이미지 파일
 * @returns 위 조건을 만족하는 경우 true, 그렇지 않은 경우 false
*/
export const isValidImageFile = (file: File) => {
  if (!file.type.startsWith("image/")) {
    return false;
  }

  const fileSize = file.size;
  const maxFileSize = 5 * 1024 * 1024;

  if (fileSize > maxFileSize) {
    return false;
  }

  return true;
};

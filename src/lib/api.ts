export const groupFetch = async (size: number = 10, cursor: number = 0) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/groups?size=${size}&cursor=${cursor}`,
  );
  const data = await response.json();
  return data;
};

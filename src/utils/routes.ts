export const routes = {
  // (auth)
  main: '/',
  findEmail: '/find-email',
  findPassword: '/find-password',
  login: '/login',
  register: '/register',
  // (user)
  userPage: (id: string) => `/users/${id}`,
  followers: (id: string) => `/users/${id}/followers`,
  followings: (id: string) => `/users/${id}/followings`,
  userGroups: (id: string) => `/users/${id}/groups`,

  // bookmark
  bookmark: '/bookmark',

  // group
  groupDetail: (id: number) => `/group/${id}`,

  // write
  write: '/write',
};

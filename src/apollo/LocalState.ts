import cookie from 'js-cookie';

export const defaults = {
  isLoggedIn: Boolean(cookie.get('token')) || false,
};

export const resolvers = {
  Mutation: {
    userLogin: (_: any, { token }: { token: string }, { cache }: { cache: any }
    ) => {
      cookie.set('token', token);
      cache.writeData({
        data: { isLoggedIn: true },
      });
      return null;
    },
    userLogout: (_: any, __: any, { cache }: { cache: any }) => {
      cookie.remove('token');
      window.location.reload();
      return null;
    },
  },
};

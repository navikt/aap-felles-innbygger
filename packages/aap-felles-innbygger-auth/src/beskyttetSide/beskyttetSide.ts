import { NextPageContext, GetServerSidePropsResult } from 'next';
import { getAccessToken } from '../lib/accessToken';
import { verifyIdportenAccessToken } from '../lib/verifyIdPortenAccessToken';

type PageHandler = (context: NextPageContext) => void | Promise<GetServerSidePropsResult<{}>>;

const wonderwallRedirect = {
  redirect: {
    destination: '/oauth2/login?redirect=/aap/innsyn',
    permanent: false,
  },
};

export function beskyttetSide(handler: PageHandler) {
  return async function withBearerTokenHandler(
    context: NextPageContext
  ): Promise<ReturnType<typeof handler>> {

    const bearerToken = getAccessToken(context);

    if (!bearerToken) {
      return wonderwallRedirect;
    }

    try {
      await verifyIdportenAccessToken(bearerToken);
    } catch (e) {
      console.log('kunne ikke validere idportentoken i beskyttetSide', e);
      return wonderwallRedirect;
    }
    return handler(context);
  };
}

export const beskyttetSideUtenProps = beskyttetSide(
  async (): Promise<GetServerSidePropsResult<{}>> => {
    return {
      props: {},
    };
  }
);

import { setAuthCookies } from '../cookie/setAuthCookies';
import serverInstance from '../http/serverInstance';

export async function refreshAccessToken(
  refreshToken: string,
): Promise<{ accessToken: string; refreshToken: string } | null> {
  try {
    const response = await serverInstance.post('/user/auth/refresh', null, {
      headers: { 'Refresh-Token': refreshToken },
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    setAuthCookies(accessToken, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    return null;
  }
}

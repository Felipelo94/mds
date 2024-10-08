import { HttpError, post } from "../api/httpsService";

type PostLikeProps = {
  id: number;
};

type PostLikeResponse<T> = {
  isOk: boolean;
  data: T | null;
  error: string | null;
};

export const postLike = async ({
  id,
}: PostLikeProps): Promise<PostLikeResponse<object>> => {
  const getSearchReaultsUrl = `http://localhost:3100/images/${id}/likes`;
  try {
    const resp = await post(getSearchReaultsUrl, {});
    return {
      isOk: true,
      data: resp,
      error: null,
    };
  } catch (e) {
    return {
      isOk: false,
      data: null,
      error: (e as HttpError).message,
    };
  }
};

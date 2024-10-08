import { get, HttpError } from "../api/httpsService";
import { GetAPIResponse } from "../types/api";
import { SearchApiResponse } from "../types/api";

export const getSearchResults = async (): Promise<
  GetAPIResponse<SearchApiResponse>
> => {
  const getSearchReaultsUrl = `http://localhost:3100/images`;
  try {
    const resp = await get<SearchApiResponse>(getSearchReaultsUrl);
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

export type ImageObject = {
  type: string;
  id: number;
  title: string;
  price: number;
  author: string;
  created_at: string;
  main_attachment: {
    big: string;
    small: string;
  };
  likes_count: number;
  liked: boolean;
  links: {
    rel: string;
    uri: string;
    methods: string;
  }[];
};

export type SearchApiResponse = {
  data: ImageObject[];
};

type GetSuccessResponse<T> = {
  isOk: true;
  data: T;
  error: null;
};

type GetFailedResponse = {
  isOk: false;
  data: null;
  error: string;
};

export type GetAPIResponse<T> = GetSuccessResponse<T> | GetFailedResponse;

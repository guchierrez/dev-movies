import { Dispatch, RefObject, SetStateAction } from "react";
import { TLoginFormValues } from "../schema/LoginSchema";
import { TRegisterFormValues } from "../schema/RegisterSchema";
import { TReviewFormValues } from "../schema/ReviewSchema";

export interface IMovieReviews {
  id: number;
  name: string;
  type: string;
  duration: number;
  synopsis: string;
  image: string;
  reviews: IReview[];
}

export interface IReview {
  id: number;
  movieId: number;
  userId: number;
  score: number;
  description: string;
}

export interface IMovie {
  id: number;
  name: string;
  type: string;
  duration: number;
  synopsis: string;
  image: string;
  reviews: IReview[];
}

export interface IReview {
  id: number;
  movieId: number;
  userId: number;
  score: number;
  description: string;
}

export interface IUser {
  email: string;
  name: string;
  id: number;
}

export interface ILogin {
  accessToken: string;
  user: IUser;
}

export interface IMovieStore {
  user: undefined | IUser;
  userLogin: (
    formData: TLoginFormValues,
    setLoading: Dispatch<SetStateAction<boolean>>,
    callback: () => void
  ) => Promise<void>;
  userInfo: IUser;
  autoLogin: (userInfo: IUser) => void;
  userLogout: (callback: () => void) => void;
  userRegister: (
    formData: TRegisterFormValues,
    setLoading: Dispatch<SetStateAction<boolean>>,
    callback: () => void
  ) => Promise<void>;
  addReviewModalRef: RefObject<HTMLDialogElement>;
  editReviewModalRef: RefObject<HTMLDialogElement>;
  deleteReviewModalRef: RefObject<HTMLDialogElement>;
  addReview: (
    formData: TReviewFormValues,
    setLoading: Dispatch<SetStateAction<boolean>>,
    userId: string,
    movieId: string,
    callback: () => void
  ) => Promise<void>;
  currentReview: undefined | IReview;
  fetchReview: (movieId: string, userId: string) => Promise<void>;
  fetchReviews: (
    movieId: string,
    setLoading?: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>;
  deleteReview: (
    reviewId: string,
    token: string,
    setLoading: Dispatch<SetStateAction<boolean>>,
    callback: () => void
  ) => Promise<void>;
  reviews: undefined | IMovieReviews;
  token: string | null;
  editReview: (
    formData: TReviewFormValues,
    setLoading: Dispatch<SetStateAction<boolean>>,
    userId: string,
    movieId: string,
    reviewId: string,
    callback: () => void
  ) => Promise<void>;
}

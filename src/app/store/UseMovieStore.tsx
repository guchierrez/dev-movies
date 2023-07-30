"use client";

import { create } from "zustand";
import { api } from "../services/api";
import { TLoginFormValues } from "../schema/LoginSchema";
import { toast } from "react-toastify";
import { Dispatch, RefObject, SetStateAction, createRef } from "react";
import { TRegisterFormValues } from "../schema/RegisterSchema";
import { TReviewFormValues } from "../schema/ReviewSchema";
import { IMovieReviews } from "../interfaces";

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
  movies: undefined | IMovie[];
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
  fetchReviews: (movieId: string) => Promise<void>;
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

const LOCAL_STORAGE_KEY_USER = "@devmovies_user";
const LOCAL_STORAGE_KEY_TOKEN = "@devmovies_token";

export const useMovieStore = create<IMovieStore>((set) => ({
  movies: undefined,
  user: undefined,
  userLogin: async (
    formData: TLoginFormValues,
    setLoading: Dispatch<SetStateAction<boolean>>,
    callback: () => void
  ) => {
    try {
      setLoading(true);
      const { data } = await api.post<ILogin>("/login", formData);
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, data.accessToken);
        localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(data.user));
      }
      set({ user: data.user });
      toast.success("Login realizado com sucesso");
      callback();
    } catch (error) {
      toast.error("Houve um erro ao fazer o login.");
    } finally {
      setLoading(false);
    }
  },
  userRegister: async (
    formData: TRegisterFormValues,
    setLoading: Dispatch<SetStateAction<boolean>>,
    callback: () => void
  ) => {
    try {
      setLoading(true);
      const { data } = await api.post<ILogin>("/users", formData);
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, data.accessToken);
        localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(data.user));
      }
      set({ user: data.user });
      toast.success("Cadastro realizado com sucesso");
      callback();
    } catch (error) {
      toast.error("Houve um erro ao fazer o cadastro.");
    } finally {
      setLoading(false);
    }
  },
  userInfo:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USER) ?? "null")
      : null,
  autoLogin: (userInfo: IUser) => {
    if (userInfo !== null) {
      set({ user: userInfo });
    }
  },
  userLogout: (callback: () => void) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
    }
    set({ user: undefined });
    toast.success("Usuário deslogado com sucesso!");
    callback();
  },
  addReviewModalRef: createRef<HTMLDialogElement>(),
  editReviewModalRef: createRef<HTMLDialogElement>(),
  deleteReviewModalRef: createRef<HTMLDialogElement>(),
  addReview: async (
    formData: TReviewFormValues,
    setLoading: Dispatch<SetStateAction<boolean>>,
    userId: string,
    movieId: string,
    callback: () => void
  ) => {
    try {
      setLoading(true);
      await api.post(
        "/reviews",
        { ...formData, userId: Number(userId), movieId: Number(movieId) },
        {
          headers: {
            Authorization: `Bearer ${
              typeof window !== undefined
                ? localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN)
                : null
            }`,
          },
        }
      );
      toast.success("Avaliação realizada com sucesso!");
      callback();
    } catch (error) {
      toast.error("Houve algum erro com a requisição");
      console.log(error);
    } finally {
      setLoading(false);
    }
  },
  editReview: async (
    formData: TReviewFormValues,
    setLoading: Dispatch<SetStateAction<boolean>>,
    userId: string,
    movieId: string,
    reviewId: string,
    callback: () => void
  ) => {
    try {
      setLoading(true);
      await api.put(
        `/reviews/${reviewId}`,
        { ...formData, userId: Number(userId), movieId: Number(movieId) },
        {
          headers: {
            Authorization: `Bearer ${
              typeof window !== undefined
                ? localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN)
                : null
            }`,
          },
        }
      );
      toast.success("Avaliação realizada com sucesso!");
      callback();
    } catch (error) {
      toast.error("Houve algum erro com a requisição");
      console.log(error);
    } finally {
      setLoading(false);
    }
  },
  currentReview: undefined,
  fetchReview: async (movieId: string, userId: string) => {
    try {
      const { data } = await api.get<IReview[]>(
        `/movies/${movieId}/reviews?userId=${String(userId)}`
      );
      const filteredReview = await data.filter(
        (review) => review.id === Number(userId)
      );
      set({ currentReview: await filteredReview[0] });
    } catch (error) {
      console.log(error);
    } finally {
    }
  },

  reviews: undefined,
  fetchReviews: async (movieId: string) => {
    try {
      const { data } = await api.get<IMovieReviews>(
        `/movies/${movieId}?_embed=reviews`
      );
      console.log(data);
      set({ reviews: data });
    } catch (error) {
      console.log(error);
    }
  },
  deleteReview: async (
    reviewId: string,
    token: string,
    setLoading: Dispatch<SetStateAction<boolean>>,
    callback: () => void
  ) => {
    try {
      setLoading(true);
      await api.delete<IReview[]>(`/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Avaliação excluída com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Houve algum erro. Tente novamente.");
    } finally {
      callback();
      setLoading(false);
    }
  },
  token:
    typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN)
      : null,
}));

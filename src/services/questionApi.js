/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../constants/apiConstants";

export const problemsApi = createApi({
    //     reducerPath: "problems",
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
        // Kategoriyalarni olish
        getCategories: builder.query({
            query: () => `/category/list`,
            transformResponse: (response) => response.data,
        }),

        // Topiclarni olish
        getTopics: builder.query({
            query: () => `/topic/list/${1}`,
            transformResponse: (response) => response.data,
        }),

        // Topic bo'yicha savollarni olish
        getQuestionsByTopic: builder.query({
            query: (topicId) => `/topic/get/${topicId}`,
            transformResponse: (response) => response.data?.questionList,
        }),

        // Id bo'yicha savolni olish
        getQuestion: builder.query({
            query: ({ questionId, userId }) =>
                `question/get/${questionId}/${userId}`,
            transformResponse: (response) => response.data,
        }),

        // Javob ni POST qilish
        postAnswer: builder.mutation({
            query: (answer) => ({
                url: `/question/submit/${1}`,
                method: "POST",
                body: answer,
                prepareHeaders: (headers, { getState }) => {
                    // headers.set("Access-Control-Allow-Origin", "*");
                    headers.set(
                        "Authorization",
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmJvc0BnbWFpbC5jb20iLCJpYXQiOjE2ODg3MTA1MDMsImV4cCI6MTY4ODc5NjkwM30.ddpgGAhkz8iXCXJ8VVPojEJirkzV4DXaIg6ZieEVY9U"
                    );
                    return headers;
                },
            }),
            transformResponse: (response) => response.data,
        }),
    }),
});

export const {
    useGetTopicsQuery,
    useGetQuestionQuery,
    usePostAnswerMutation,
    useGetQuestionsByTopicQuery,
    useGetCategoriesQuery,
} = problemsApi;

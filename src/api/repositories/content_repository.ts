import { ApiClient } from "../api-client";
import { ContentType } from "../model";
import { AxiosResponse } from "axios";

export type ContentRepository = {
  getContents: () => Promise<ContentType[]>;
  getContent: (params: Pick<ContentType, "id">) => Promise<ContentType>;
  createContent: (
    params: Omit<ContentType, 'id' | 'createdAt' |  'updatedAt'>
  ) => Promise<AxiosResponse<any, any>>;
  updateContent: (params: Omit<ContentType, 'createdAt' | 'updatedAt'>) => Promise<AxiosResponse<any, any>>;
  deleteContent: (id : number) => Promise<AxiosResponse<any, any>>;
};

const getContents : ContentRepository["getContents"] = async (): Promise<ContentType[]> => {
  const response = await ApiClient.get(`/content`);
  return response.data;
};

const getContent : ContentRepository["getContent"] = async (params: Pick<ContentType, "id">): Promise<ContentType> => {
  const response = await ApiClient.get(`/content/${params.id}`);
  return response.data;
};

const createContent : ContentRepository["createContent"] = async (
  params: Omit<ContentType, 'id' | 'createdAt' |  'updatedAt'>
) => {
  const response = await ApiClient.post(`/content`, params);
  return response;
};

const updateContent : ContentRepository["updateContent"] = async (content: Omit<ContentType, 'createdAt' | 'updatedAt'>) => {
    const response = await ApiClient.put<ContentType>(`${process.env.REACT_APP_API_URL}/content/${content.id}`, {
        title: content.title, body: content.body
    })
    return response;
}

const deleteContent : ContentRepository["deleteContent"] = async (id : number) => {
  const response = await ApiClient.delete(`/content/${id}`);
  return response;
};

export const contentRepository: ContentRepository = {
  getContents,
  getContent,
  createContent,
  updateContent,
  deleteContent
};
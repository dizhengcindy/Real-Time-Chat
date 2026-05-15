import { toast } from 'react-hot-toast';
import { create } from 'zustand';

import { axiosInstance } from '../lib/axios';

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,
   getUsers: async () => {
    set({ isUserLoading: true });
    try {
        const response = await axiosInstance.get('/messages/users');
        set({ users: response.data });
    } catch (error) {
        console.log("Error in getUsers", error.message);
        toast.error(error.response.data.message);
    } finally {
        set({ isUserLoading: false });
    }
   },
   getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
        const response = await axiosInstance.get(`/messages/${userId}`);
        set({ messages: response.data });
    } catch (error) {
        console.log("Error in getMessages", error.message);
        toast.error(error.response.data.message);
    } finally {
        set({ isMessageLoading: false });
    }
   },
   sendMessage: async (messageData) => {
    const {selectedUser, messages} = get();
    try {
        const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
        set({ messages: [...messages, response.data] });
    } catch (error) {
        console.log("Error in sendMessage", error.message);
        toast.error(error.response.data.message);
    }
   },
   //Todo: optimize this later
   setSelectedUser: (selectedUser) => {
    set({ selectedUser });
   },
}));
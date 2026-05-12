import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check');
            set({ authUser: response.data });
        } catch (error) {
            console.log("Error in checkAuth", error.message);
            set({ authUser: null });
        }finally{
            set({ isCheckingAuth: false });
        }
    },
    signUp: async (data) => {
        try {
            const response = await axiosInstance.post('/auth/signup', data);
            set({ authUser: response.data });
            toast.success("Account created successfully");
        } catch (error) {
            console.log("Error in signUp", error.message);
            toast.error(error.response.data.message);
        }finally{
            set({ isSigningUp: false });
        }
    },
    login: async (data) => {
        try {
            const response = await axiosInstance.post('/auth/login', data);
            set({ authUser: response.data });
            toast.success("Logged in successfully");
        } catch (error) {
            console.log("Error in login", error.message);
            toast.error(error.response.data.message);
        }finally{
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            console.log("Error in logout", error.message);
            toast.error(error.response.data.message);
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
         const response = await axiosInstance.put('/auth/update-profile', data);
         set({ authUser: response.data });
         toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error in updateProfile", error.message);
            toast.error(error.response.data.message);
        }finally{
            set({ isUpdatingProfile: false });
        }
    }
}));
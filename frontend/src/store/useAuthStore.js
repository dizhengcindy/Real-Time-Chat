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
    }
}));
import * as SecureStore from 'expo-secure-store';

// Lưu trữ dữ liệu
export const saveData = async (key, value) => {
    try {
        await SecureStore.setItemAsync(key, value);
        console.log('Dữ liệu đã được lưu');
    } catch (error) {
        console.error('Lỗi khi lưu dữ liệu', error);
    }
};

// Lấy dữ liệu
export const getData = async (key) => {
    try {
        const value = await SecureStore.getItemAsync(key);
        console.log('Dữ liệu đã lấy:', value);
        return value;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu', error);
    }
};

// Xóa dữ liệu
export const deleteData = async (key) => {
    try {
        await SecureStore.deleteItemAsync(key);
        console.log('Dữ liệu đã được xóa');
    } catch (error) {
        console.error('Lỗi khi xóa dữ liệu', error);
    }
};
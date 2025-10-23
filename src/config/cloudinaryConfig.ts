// Cloudinary Upload Configuration
// Add this to your AdminDashboard.tsx

export const cloudinaryConfig = {
    cloudName: 'dwxlfrrg2',
    uploadPreset: 'ml_default', // You'll need to create this in Cloudinary
};

// Function to upload images to Cloudinary
export const uploadToCloudinary = (
    folder: string = 'portfolio',
    onSuccess: (result: any) => void,
    onError?: (error: any) => void
) => {
    // Check if Cloudinary widget is loaded
    if (typeof window.cloudinary === 'undefined') {
        alert('Cloudinary widget not loaded. Make sure script is in index.html');
        return;
    }

    const widget = window.cloudinary.createUploadWidget(
        {
            cloudName: cloudinaryConfig.cloudName,
            uploadPreset: cloudinaryConfig.uploadPreset,
            sources: ['local', 'url', 'camera'],
            multiple: true,
            maxFiles: 10,
            folder: folder,
            resourceType: 'image',
            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            maxFileSize: 10000000, // 10MB
            maxImageWidth: 3000,
            maxImageHeight: 3000,
            cropping: false,
            thumbnails: '.cloudinary-thumbnails',
            showPoweredBy: false,
            styles: {
                palette: {
                    window: '#0a0a0a',
                    windowBorder: '#404040',
                    tabIcon: '#ffffff',
                    menuIcons: '#ffffff',
                    textDark: '#000000',
                    textLight: '#ffffff',
                    link: '#ffffff',
                    action: '#ffffff',
                    inactiveTabIcon: '#737373',
                    error: '#ef4444',
                    inProgress: '#0078FF',
                    complete: '#10b981',
                    sourceBg: '#171717'
                },
                fonts: {
                    default: null,
                    "'Inter', sans-serif": {
                        url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap',
                        active: true
                    }
                }
            }
        },
        (error: any, result: any) => {
            if (error) {
                console.error('Upload error:', error);
                if (onError) onError(error);
                return;
            }

            if (result.event === 'success') {
                console.log('Upload successful:', result.info);
                onSuccess(result.info);
            }
        }
    );

    widget.open();
};

// Type definitions for Cloudinary
declare global {
    interface Window {
        cloudinary: any;
    }
}
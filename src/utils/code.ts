

export const donCheckGetImageUrl = (patent?: string) => {
    return `${import.meta.env.VITE_BASE_URL}/${patent}`;
};


const resolveImageUrl = (path) => {
    if (!path) {
        return 'placeholder.png';
    }
    if (path.startsWith('http')) {
        return path;
    }

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    return `${backendUrl}/${path}`;
};

export default resolveImageUrl;
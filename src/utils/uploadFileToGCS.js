export const uploadFileToGCS = async (file, bucketName, username) => {
    const filePath = `${username}/${file.name}`;
    const bucketUrl = `https://storage.googleapis.com/${bucketName}/${filePath}`;

    try {
        const response = await fetch(bucketUrl, {
            method: "PUT",
            headers: {
                "Content-Type": file.type,
            },
            body: file,
        });

        if (!response.ok) {
            throw new Error(`Failed to upload file: ${response.statusText}`);
        }

        return bucketUrl; 
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

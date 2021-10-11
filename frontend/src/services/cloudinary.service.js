export async function uploadImg(ev) {
    const CLOUD_NAME = 'CLOUD_NAME'
    const UPLOAD_PRESET = 'CLOUD_UPLOAD'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', UPLOAD_PRESET);
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        return data.url;
    }
    catch (err) {
        console.error(err)
    }
}

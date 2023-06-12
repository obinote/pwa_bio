import mime from 'mime-types';

/**
 * Download File
 * - Change file to Blob with extension and mime
 *
 * @param string link
 * @returns object
 */
export const downloadfile = async (link) => {
    const tempResult = {
        status: false,
        message: '',
        data: {
            link,
        },
    };
    const get = await fetch(link).then((res) => res);

    if (!get.ok) {
        return { ...tempResult, message: 'Invalid response from target url' };
    }

    // check filename on content-disposition headers
    const headerFileName = [...get.headers].find((x) => x[0] === 'content-disposition');
    if (headerFileName < 0) {
        return { ...tempResult, message: 'Filename/Extension not found' };
    }

    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(headerFileName[1]);
    let filename = '';

    if (matches != null && matches[1]) {
        const fullFilename = matches[1].replace(/['"]/g, '');
        tempResult.data.fullFileName = fullFilename;
        filename = fullFilename.split('.');
    } else {
        return { ...tempResult, message: 'Filename not found' };
    }

    const extension = filename.pop();
    const currentMime = mime.lookup(extension);

    if (!currentMime) {
        return { ...tempResult, message: 'Mime not found' };
    }
    tempResult.data.filename = filename.join();
    tempResult.data.extension = extension;
    tempResult.data.mime = currentMime;

    const tempBlob = await get.blob();
    const newBlob = tempBlob.slice(0, tempBlob.size, currentMime);

    const result = URL.createObjectURL(newBlob);
    tempResult.data.blobUrl = result;
    tempResult.status = true;
    return tempResult;
};

export default downloadfile;

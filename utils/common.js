module.exports.validateRequestBody = async (body, keys) => {
    try {
        let missingKeys = [];
        let payload = {};

        for (const keyObj of keys) {
            const key = keyObj.property;
            const value = body[key];

            if (!value && !keyObj.optional) {
                missingKeys.push(key);
            } else if (value !== undefined) {
                payload[key] = value;
            }
        }

        if (missingKeys.length > 0) {
            const missingKeyString = missingKeys.join(', ');
            throw new Error(`Please provide the following key(s): ${missingKeyString}`);
        }
        return payload;
    } catch (error) {
        console.log(`Error occurred validating request body - ${JSON.stringify(body)}, keys - ${JSON.stringify(keys)} & error - ${error}`);
        throw error;
    }
};
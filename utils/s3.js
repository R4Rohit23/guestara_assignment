const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

module.exports.uploadFileToS3 = async (file, fileName, bucketName) => {
  try {  
      // Create S3 object parameters (adjust ACL as needed)
      const params = {
          Bucket: bucketName,  
          Key: fileName,  
          Body: file.buffer,  
      };

      // Upload the file to S3
      const output = await s3.upload(params).promise();

      console.log(`[uploadImageToS3] Single Image output : ${JSON.stringify(output)}`)

      // Generate the uploaded image URL
      const imageUrl = output.Location;

      return imageUrl;
  } catch (error) {
      console.error(`[uploadImageToS3] Error occurred: ${error}`);
      return "ERROR_IMAGE_URL";
  }
};
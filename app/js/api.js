


// Replace with your Cloudflare account ID and API token
const accountId = '2dbadb5985d6a2659ecd1f40eec2044a';
const token = '56c9002c08f049081aa2d5155c9bbd8f96cf4';

const AItoken='CYLR7pkcLgPIO5oFzwIveL4UPFSRxOD6u0ktzurH';

// Initialize the Cloudflare API
const cf = cloudflare({
  accountId: accountId,
  token: token
});

// Generate a unique user ID
function generateUserId() {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000000);
  const userId = `USER_${timestamp}_${randomNum}`;
  return userId;
}

// Upload a file to Cloudflare D1 database with a generated user ID
async function uploadFile(file) {
  try {
    const userId = generateUserId();
    const databaseName = `USER_${userId}`;
    const response = await cf.d1Database.upload(databaseName, file);
    return { userId, response };
  } catch (error) {
    console.error(`Error uploading file for user ${userId}:`, error);
    throw error;
  }
}

// Get a list of files from Cloudflare D1 database for a specific user
async function getFiles(userId) {
  try {
    const databaseName = `USER_${userId}`;
    const files = await cf.d1Database.list(databaseName);
    return files;
  } catch (error) {
    console.error(`Error getting files for user ${userId}:`, error);
    throw error;
  }
}

// Retrieve RAG chatbot response from Cloudflare AI for a specific user
async function getRagChatbotResponse(query, userId) {
  try {
    const files = await getFiles(userId);
    const response = await cf.ai.getRagResponse(query, {
      documents: files,
      modelId: 'mistral-7b-instruct-v0.1'
    });
    return response;
  } catch (error) {
    console.error(`Error getting RAG chatbot response for user ${userId}:`, error);
    throw error;
  }
}
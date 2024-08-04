const core = require('@actions/core');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

async function run() {
  try {
    const filePath = core.getInput('file-path');
    const uploadUrl = core.getInput('upload-url');
    const authToken = core.getInput('auth-token');

    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    const response = await axios.post(uploadUrl, form, {
      headers: {
        ...form.getHeaders(),
        'X-Integrator-Container': `${authToken}`
      }
    });

    core.setOutput('response', response.data);
    console.log('File uploaded successfully', response.data);
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
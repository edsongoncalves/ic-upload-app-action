const core = require('@actions/core');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

async function run() {
  try {
    const filePath = core.getInput('zip-file-path');
    const projectUrl = core.getInput('project-url');
    const key = core.getInput('key');

    const form = new FormData();
    form.append('filename', fs.createReadStream(filePath));

    const response = await axios.post(projectUrl, form, {
      headers: {
        ...form.getHeaders(),
        'X-Integrator-Container': `${key}`
      }
    });

    core.setOutput('response', response.data);
    console.log('File uploaded successfully', response.data);
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
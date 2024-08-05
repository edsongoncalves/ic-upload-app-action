const core = require('@actions/core');
const fs = require('fs');
const FormData = require('form-data');
const url = require('url');

async function run() {
  try {
    const filePath = core.getInput('zip-file-path');
    const projectUrl = core.getInput('project-url');
    const key = core.getInput('key');

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found at path: ${filePath}`);
    }

    const form = new FormData();
    form.append('filename', fs.createReadStream(filePath));

    const parsedUrl = new URL(projectUrl);
    const options = {
      method: 'POST',
      headers: {
        ...form.getHeaders(),
        'X-Integrator-Container': `${key}`
      }
    };

    form.submit({ host: parsedUrl.hostname, path: parsedUrl.pathname, protocol: parsedUrl.protocol, headers: options.headers }, (err, res) => {
      if (err) {
        core.setFailed(`Action failed with error: ${err.message}`);
        return;
      }

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          core.setOutput('response', data);
          console.log('File uploaded successfully', data);
        } else {
          core.setFailed(`Upload failed with status code: ${res.statusCode}`);
        }
      });

      res.on('error', (error) => {
        core.setFailed(`Action failed with error: ${error.message}`);
      });
    });
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
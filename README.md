# Upload ZIP Action

This action uploads a ZIP file to a Container Project URL.

## Inputs

### `zip-file-path`

**Required** The path to the ZIP file.

### `project-url`

**Required** The project URL to upload the file.

### `key`

**Required** The key authentication project token for the upload.

## Outputs

### `response`

The response from the upload request.

## Example usage

```yaml
uses: edsongoncalves/ic-upload-app-action@v0.1.1
with:
  zip-file-path: 'path/to/your/file.zip'
  project-url: 'https://project-url.com/api/projects/<ID>/deploy'
  key: ${{ secrets.AUTH_TOKEN }}

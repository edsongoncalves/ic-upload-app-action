# Upload ZIP Action

This action uploads a ZIP file to a Container Project URL.

## Inputs

### `file-path`

**Required** The path to the ZIP file.

### `upload-url`

**Required** The URL to upload the file.

### `auth-token`

**Required** The authentication project token for the upload.

## Outputs

### `response`

The response from the upload request.

## Example usage

```yaml
uses: edsongoncalves/ic-upload-app-action@v0.1.0
with:
  file-path: 'path/to/your/file.zip'
  upload-url: 'https://your-upload-url.com/upload'
  auth-token: ${{ secrets.AUTH_TOKEN }}

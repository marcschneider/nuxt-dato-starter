import SHA256 from 'crypto-js/sha256.js'

export const PREVIEW_MODE_COOKIE_NAME = '__datocms_preview_data'

export function previewModeEncryptionSecretHash(secret) {
  return SHA256(secret).toString()
}

export function isEnabledPreview(preview) {
  return preview.enabled === true
}

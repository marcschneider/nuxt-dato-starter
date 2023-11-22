import SHA256 from 'crypto-js/sha256.js'

export interface EnabledPreview {
  enabled: true
  token: string
}

export interface DisabledPreview {
  enabled: false
}

export type Preview = EnabledPreview | DisabledPreview

export const PREVIEW_MODE_COOKIE_NAME = '__datocms_preview_data'

export function previewModeEncryptionSecretHash(secret: string) {
  return SHA256(secret).toString()
}

export function isEnabledPreview(preview: Preview): preview is EnabledPreview {
  return preview.enabled === true
}

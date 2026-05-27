import { uploadService } from '@/services/uploadService'

export default class UploadAdapter {
  constructor(loader) {
    this.loader = loader
  }

  async upload() {
    try {
      const file = await this.loader.file
      const response = await uploadService.uploadImage( file )
      return { default: response.image.url }
    } catch (error) {
      console.error('CKEditor upload failed:', error)
      throw error
    }
  }

  abort() {}
}
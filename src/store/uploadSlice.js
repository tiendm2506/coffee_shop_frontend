import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiService from '@/services/apiService'
import { API_ENDPOINTS } from '@/constants'

export const uploadImages = createAsyncThunk(
  'upload/uploadImages',
  async (files, { rejectWithValue }) => {
    try {
      const formData = new FormData()

      files.forEach(file => {
        formData.append('uploads', file)
      })

      const response = await apiService.post(
        '/upload/images',
        formData,
        {
          headers: {
            'Content-Type':'multipart/form-data'
          }
        }
      )

      if (!response.success) {
        return rejectWithValue(response)
      }

      return response.images
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

export const uploadImage = createAsyncThunk(
  'upload/uploadImage',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('image', file)
      const response = await apiService.post(API_ENDPOINTS.UPLOAD_SINGLE_IMAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (!response.success) return rejectWithValue(response)
      return response.image
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

export const deleteImage = createAsyncThunk(
  'upload/deleteImage',
  async (public_id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        '/upload/image',
        {
          data: { public_id }
        }
      )
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

const uploadSlice = createSlice({
  name: 'upload',

  initialState: {
    loading: false,
    images: [],
    image: null,
    error: null
  },

  reducers: {
    clearUploadedImages: (state) => {
      state.images = []
    },
    clearUploadedImage: (state) => {
      state.image = null
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.loading = true
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.loading = false
        state.images = action.payload
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteImage.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.loading = false
        state.images =
        state.images.filter(
          img => img.url !== action.payload
        )
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearUploadedImages, clearUploadedImage } = uploadSlice.actions

export default uploadSlice.reducer
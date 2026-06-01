import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiService from '@/services/apiService'
import { API_ENDPOINTS } from '@/constants'

const initialState = {
  loading: false,
  accessToken: null,
  refreshToken: null,
  user: null,
  error: null
}

export const LOGIN = 'LoginState/LOGIN'
export const login = createAsyncThunk(
  LOGIN,
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.LOGIN, params)
      if (!response.success) return rejectWithValue(response.metaData)
      return response.metaData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.user = action.payload.user
    },
    logout: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.user = action.payload.user
    })
  }
})

export const selectUser = (state) => state.auth.user
export const { setAuth, logout } = authSlice.actions
export default authSlice.reducer
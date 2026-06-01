import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ROUTES } from '@/constants'

const AdminRoute = ({ children }) => {
  const router = useRouter()
  const { accessToken } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!accessToken) {
      router.replace(ROUTES.LOGIN)
    }
  }, [accessToken, router])
  if (!accessToken) return null

  return children
}

export default AdminRoute
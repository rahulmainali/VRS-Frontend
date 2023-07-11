import React from 'react'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import { loginAuth } from '../features/login/loginSlice'

export function useAuth() {
  const [user, setUser] = useState<null | string>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = useAppSelector((state)=>state.login.loggedIn)
  const dispatchRedux = useAppDispatch()

  useEffect(() => {
    const user = localStorage?.getItem('user')

    if (login) {
      try {
        if (user) setUser(JSON?.parse(user))
        setIsAuthenticated(true)
      } catch (error) {
        setUser(null)
      }
    } else {
      setUser(null)
      setIsAuthenticated(false)
    }
  }, [login])
  return { user, isAuthenticated }
}

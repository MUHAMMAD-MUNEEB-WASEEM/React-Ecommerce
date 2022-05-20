import React from 'react'
import { publicRequest } from '../requestMethods'
import { loginFailure, loginStart, loginSuccess } from './userRedux'

export const login = async(dispatch, user) => {
    dispatch(loginStart())
    publicRequest.post('/auth/login', user)
    .then(user=>{
        dispatch(loginSuccess(user.data))
    })
    .catch(err=>{
        dispatch(loginFailure())
    })

}

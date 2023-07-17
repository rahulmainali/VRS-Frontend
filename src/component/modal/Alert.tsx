import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

import React from 'react'

interface Error {
        statusCode: number,
        message: string
    }

const AlertPop = ({statusCode, message} : Error) =>{

    return (
        <>
        {statusCode == 401 ? <Alert status='error'>
            <AlertIcon /> {message}
        </Alert>: <></> 
        }
        </>
    )

}

export default AlertPop;

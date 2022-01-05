import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Avatar, Button, Typography, Toolbar } from '@material-ui/core'
import memories from '../../images/memories.png'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'

const Navbar = () => {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const logout = () => {
        dispatch({ type: 'LOGOUT' })

        navigate('/')
        window.location.reload()
        setUser(null)
    }
    useEffect(() => {
        const Token = user?.token

        //JWT
        if (Token) {
            const decodedToken = decode(Token)

            if (decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    return (

        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button component={Link} to="/" variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <div>
                        <Button component={Link} to="/auth" variant="contained" className={classes.logout} color="primary">Sign In</Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>

    )
}

export default Navbar

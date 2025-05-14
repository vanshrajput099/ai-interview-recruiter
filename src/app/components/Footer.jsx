import { Github, GithubIcon, Linkedin, LinkedinIcon } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <div className='bg-gray-100 w-full p-5 text-center'>
            <h1>Made By Vansh Rajput</h1>
            <div className='flex justify-center gap-2'>
                <a className='' href="https://www.linkedin.com/in/vansh-rajput-a18520259/" target='_blank'>
                    <LinkedinIcon />
                </a>
                <a className='' href="https://github.com/vanshrajput099" target='_blank'>
                    <GithubIcon />
                </a>
            </div>
        </div>
    )
}

export default Footer
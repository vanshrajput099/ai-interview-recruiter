"use client";
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import React from 'react'

const SendLinkButton = ({ url }) => {

    const sendMail = () => {
        const subject = encodeURIComponent("Check this out!");
        const body = encodeURIComponent(`Your Interview Link : ${url} `);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }

    return (
        <Button onClick={sendMail} className={'bg-blue-400 text-blue-100'}><Send /> Send</Button>
    )
}

export default SendLinkButton
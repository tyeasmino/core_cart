import React from 'react' 
import logoImg from 'public/logo.png' 
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, User } from 'lucide-react';

const NavbarComponent = () => {
  return (
    <div className='max-w-7xl mx-auto py-3'>
        <nav className='flex items-center justify-between'>
            <Link href={"/"} >
                 <Image className='w-20 h-20'
                    src={logoImg}
                    alt='Logo'
                />  
            </Link>

            <div className='flex items-center gap-5'>
                <Link href={"/"} className='hover:text-theme font-semibold'>Home</Link> 
                <Link href={"/"} className='hover:text-theme font-semibold'>Products</Link> 
                <Link href={"/"} className='hover:text-theme font-semibold'>Orders</Link> 
                <Link href={"/"} className='hover:text-theme' > <ShoppingCart/> </Link> 
                <Link href={"/"} className='hover:text-theme'>   <User /></Link> 
            </div>
        </nav>
    </div>
  )
}

export default NavbarComponent
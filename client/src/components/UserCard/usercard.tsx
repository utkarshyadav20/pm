import { User } from '@/state/api'
import Image from 'next/image'
import React from 'react'

type Props = {
    user:User
}

const UserCard = ({user}: Props) => {
  return (
    <div className="flex items-center rounded border p-4 shadow">
      {user.profilePictureUrl && (
        <Image
          src={`https://project-management-s3-image.s3.us-east-1.amazonaws.com/${user.profilePictureUrl}`}
          alt="profile picture"
          width={36}
          height={36}
          className="rounded-fullinline-block h-12 w-12 rounded-full ring-2 ring-white"
        />
      )}
      <div className='p-3'>
        <h3>{user.username}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
}

export default UserCard
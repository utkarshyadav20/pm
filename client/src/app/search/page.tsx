"use client"
import Header from '@/components/Header/header';
import ProjectCard from '@/components/ProjectCard/projectcard';
import TaskCard from '@/components/TaskCard/taskcard';
import UserCard from '@/components/UserCard/usercard';
import { useSearchQuery } from '@/state/api';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react'



const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const {
        data: searchResults,
        isLoading,
        isError,
    } = useSearchQuery(searchTerm, {
        skip: searchTerm.length < 3,
    });
    const handleSearch = debounce(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value)
        },
        500,
    );

    useEffect(() => {
        return handleSearch.cancel;
    }, [handleSearch.cancel]);

    return (
        <div className='p-8'>
            <div>
                <Header name='Search' />
                <input
                    type='text'
                    placeholder='Search..'
                    className='w-1/2 rounded border p-3 shadow'
                    onChange={handleSearch}
                >
                </input>
            </div>

            <div className='p-5'>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error While loading Tasks</p>}

                {!isLoading && !isError && searchResults && (
                    <div>
                        {searchResults.tasks && searchResults.tasks?.length > 0 && (
                          <Header name='Tasks:-' />)}
                        {searchResults.tasks?.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}

                        {searchResults.projects && searchResults.projects?.length > 0 && (
                             <Header name='Projects:-' />)}
                        {searchResults.projects?.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}



                        {searchResults.users && searchResults.users?.length > 0 && (
                           <Header name='Users :-' />)}
                        {searchResults.users?.map((user) => (
                            <UserCard key={user.userId} user={user} />
                        ))}



                    </div>
                )

                }
            </div>

        </div>
    )
}

export default Search
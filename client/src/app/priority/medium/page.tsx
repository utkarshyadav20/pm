import React from 'react'
import ReusablePriorityPage from '../resusablePriorityPage';
import { Priority } from '@/state/api';

type Props = {}

const Medium = (props: Props) => {

    return <ReusablePriorityPage priority={Priority.Medium} />;
  
}

export default Medium
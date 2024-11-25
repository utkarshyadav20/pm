import React from 'react'
import ReusablePriorityPage from '../resusablePriorityPage';
import { Priority } from '@/state/api';

type Props = {}

const High = (props: Props) => {

    return <ReusablePriorityPage priority={Priority.High} />;
  
}

export default High
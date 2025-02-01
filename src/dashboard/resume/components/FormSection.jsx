import React, { useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { ArrowRight, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button';

function FormSection() {
  const {activeFormIndex,setActiveFromIndex}=useState(1);
  return (
    <div>
      <div className='flex justify-between items-center'>
        <Button variant='outline' size='sm' className='flex gap-2' > <LayoutGrid/> Theme</Button>
        <div>
          {activeFormIndex>1&&<Button size='sm' className=''><Arrowleft/></Button>}
          <Button className='flex gap-2' size='sm'>Next
            <ArrowRight/></Button>
        </div>
      </div>
      {/* Personal Detail */}
      <PersonalDetails/>
      {/* Summery */}

      {/* Experience */}

      {/* Education Detail */}
    
      {/* Skills */}

    </div>
  )
}


export default FormSection


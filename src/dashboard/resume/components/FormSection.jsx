import React, { useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { ArrowLeft, ArrowRight, LayoutGrid, } from 'lucide-react'
import { Button } from '@/components/ui/button';
import Summery from './forms/Summery';
import Experience from './forms/Experience';

function FormSection() {
  const [activeFormIndex,setActiveFromIndex]=useState(1);
  const [enableNext,setEnableNext] = useState(false)
  console.log(activeFormIndex)
  return (
    <div>
      <div className='flex justify-between items-center'>
        <Button variant='outline' size='sm' className='flex gap-2' > <LayoutGrid/> Theme</Button>
        <div className='flex gap-2'>
          {activeFormIndex>1
          &&<Button size='sm' onClick={()=>setActiveFromIndex(activeFormIndex-1)}><ArrowLeft/></Button>}
          <Button disabled={!enableNext} className='flex gap-2' size='sm' onClick={()=>setActiveFromIndex(activeFormIndex+1)} >Next
            <ArrowRight/></Button>
        </div>
      </div>
      {/* Personal Detail */}
      {activeFormIndex==1 ? <PersonalDetails enableNext={(v) => setEnableNext(v)}/> : null}
      {/* Summery */}
      {activeFormIndex==2 ? <Summery enableNext={(v) => setEnableNext(v)}/> : null}
      {/* Experience */}
      {activeFormIndex==3 ? <Experience enableNext={(v) => setEnableNext(v)}/> : null}
      {/* Education Detail */}
    
      {/* Skills */} 

    </div>
  )
}


export default FormSection


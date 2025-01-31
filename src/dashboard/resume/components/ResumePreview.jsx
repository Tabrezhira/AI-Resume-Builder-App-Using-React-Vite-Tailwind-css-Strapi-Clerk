import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'

function ResumePreview() {
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext)
  return (
    <div>
        {/* Personal Detail */}
        <PersonalDetailPreview resumeInfo={resumeInfo}/>
        {/* Summery */}

        {/* Professional Experience */}

        {/* Educationl */}

        {/* Skills */}

    </div>
  )
}

export default ResumePreview
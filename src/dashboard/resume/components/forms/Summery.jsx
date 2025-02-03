import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../service/GlobalApi'
import { Brain, LoaderCircle } from 'lucide-react'
import { AIChatSession } from '../../../../../service/AIMOdal'


const prompt = 'Job Title: {jobTitle}, Depends on job title give me summery for my resume within 4-5 line in JSON format with field experince Level and Summery with Experience level for Fresher, Mid-Level, Experienced'

function Summery({enableNext}) {
    const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext)
    const [summery, setSummery] = useState()
    const [loading,setLoading] = useState(false)
    const params = useParams()
    const [aiSummeryList,setAiSummeryList]=useState();
    

    useEffect(()=>{
        summery&&setResumeInfo({
            ...resumeInfo,
            summery:summery
        })
    },[summery])

    const GenerateSummeryFromAI=async()=>{
        setLoading(true)
        const PROMPT = prompt.replace('{jobTitle}',resumeInfo?.jobTitle)
        const result = await AIChatSession.sendMessage(PROMPT);
        setAiSummeryList(JSON.parse(result.response.text()))
        console.log(JSON.parse(result.response.text()))
        setLoading(false)
    }

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            data:{
                summery:summery
            }
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then((resp)=>{
          console.log(resp)
          enableNext(true)
          setLoading(false)
          toast("Details updated")
        },(error)=>{
            console.log(error)
          setLoading(false)
        })

    }
      
  return (
    <div>
   <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 '>
        <h2 className='font-bold text-lg '>Summery</h2>
        <p>Add Summery for your job title</p>
        <form className='mt-7' onSubmit={onSave}>
            <div className='flex justify-between items-end'>
                <label>Add Summery</label>
                <Button onClick={()=>GenerateSummeryFromAI()} type='button' variant='outline' size='sm' className=' border-primary text-primary flex gap-2'> <Brain className='h-4 w-4'/> Generate from AI</Button>
            </div>
            <Textarea defaultValue={resumeInfo?.summery} className='mt-5' onChange={(e)=>setSummery(e.target.value)}/>
                <div className='mt-2 flex justify-end'>
                <Button disabled={loading} type='submit'>{loading?<LoaderCircle  className=' animate-spin'/> : 'Save'}</Button>
                </div>
        </form>
        </div>

        {aiSummeryList&& <div>
            <h2 className='font-bold text-lg mt-4'>Suggestions</h2>
            {aiSummeryList.map((item,index)=>(
                <div key={index}>
                    <h2 className='font-bold my-1'>Level:{item?.experienceLevel}</h2>
                    <p>{item?.summary}</p>
                </div>
            ))}
        </div>}
    </div>
  )
  
}
export default Summery
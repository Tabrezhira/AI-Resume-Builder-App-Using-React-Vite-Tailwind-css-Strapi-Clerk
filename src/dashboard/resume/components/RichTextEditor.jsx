import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Brain } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { 
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar, } from 'react-simple-wysiwyg'
import { AIChatSession } from '../../../../service/AIModal'
import { toast } from 'sonner'


const PROMT ='position titile:{positionTitle}, Depends on position title give me 5-7 bullet points for my rxperience in resume, give me result in HTML format'
function RichTextEditor({onRichTextEditorChange, index}) {
    const [value,setValue]=useState()
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const [loading,setLoading]=useState(false)

    const GenerateSummeryFomeAI = async()=>{
      setLoading(true)
      if(!resumeInfo.experience[index].title){
        toast('Please Add Position Title')
        return;
      }
      const prompt=PROMT.replace('{positionTitle}',resumeInfo?.experience[index].title)
      console.log(prompt)
      const result = await AIChatSession.sendMessage(prompt);
      console.log(result.response.text())
      const resp = JSON.parse(result.response.text())
      setValue(resp[0])
      setLoading(false)
    }
    console.log(resumeInfo)
  return (
    <div>
       <div className='flex justify-between my-2'>
        <label className=''text-xs>Summery</label>
        <Button onClick={GenerateSummeryFomeAI} variant='outline' size='sm' className=' text-primary border-primary flex gap-2'><Brain className='h-4 w-4'/> Generate from AI</Button>
       </div>
        <EditorProvider>
            <Editor value={value} onChange={(e)=>{setValue(e.target.value)
              onRichTextEditorChange(e)
            }}>
              <Toolbar>
              <BtnBold/>
              <BtnItalic/>
              <BtnUnderline />
              <BtnStrikeThrough />
              <Separator />
              <BtnNumberedList />
              <BtnBulletList />
              <Separator />
              <BtnLink />
              <BtnClearFormatting />
              </Toolbar>
            </Editor>
        </EditorProvider>

    </div>
  )
}

export default RichTextEditor
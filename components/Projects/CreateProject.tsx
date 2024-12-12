"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEventHandler, useState } from "react"
import { newProject } from "@/lib/actions/project"
import { useRouter } from 'next/navigation'

export function CreateProject() {
    const router = useRouter()
    const [name, setName]=useState('')
    const [description, setDescription]=useState('')

    function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>){
        setDescription(e.target.value)
    }

function handleNameChange(e: React.ChangeEvent<HTMLInputElement>){
        setName(e.target.value)
    }
async function handleSubmit(){
    try {
        const result = await newProject(name, description)
        console.log("result", result)
        router.push(`/dashboard/coder/${result.id}`)
    } catch (error) {
        console.error(error)
        throw (error)
    }
                
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Fill out your project parameters here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Project Name
            </Label>
            <Input
              id="name"
              defaultValue="To-do App"
              className="col-span-3"
              onChange={handleNameChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              defaultValue="New Project"
              className="col-span-3"
              onChange={handleDescriptionChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Create Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

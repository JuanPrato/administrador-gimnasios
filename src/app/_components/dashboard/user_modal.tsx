"use client"

import type React from "react"

import { useState } from "react"
import { UserPlus } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { UserForm } from "./user_form"

interface NewClientModalProps {
  trigger?: React.ReactNode
}

export function NewClientModal({ trigger }: NewClientModalProps) {
  const [open, setOpen] = useState(false);

  function onResult(result: boolean) {
    setOpen(!result);
  }

  const defaultTrigger = (
    <Button className="flex items-center gap-2">
      <UserPlus className="h-4 w-4" />
      Nuevo Cliente
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger ?? defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Agregar Nuevo Cliente
          </DialogTitle>
          <DialogDescription>
            Completa la información del nuevo cliente para registrarlo en el sistema.
          </DialogDescription>
        </DialogHeader>

        <UserForm onResult={onResult} />
      </DialogContent>
    </Dialog>
  )
}
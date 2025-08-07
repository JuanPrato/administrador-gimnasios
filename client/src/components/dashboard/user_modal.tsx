"use client"

import type React from "react"

import { useState } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UserPlus, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface NewClientModalProps {
  trigger?: React.ReactNode
}

export function NewClientModal({ trigger }: NewClientModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    dni: "",
    plan: "",
    fechaInicio: "",
    observaciones: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Nuevo cliente:", formData)

      toast("Cliente agregado exitosamente", {
        description: `${formData.nombre} ${formData.apellido} ha sido registrado.`
      });

      // Resetear formulario
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        dni: "",
        plan: "",
        fechaInicio: "",
        observaciones: "",
      })

      setOpen(false)
    } catch (error) {
      console.error(error);
      toast("Error", {
        description: "No se pudo agregar el cliente. Intenta nuevamente.",
      })
    } finally {
      setLoading(false)
    }
  }

  const defaultTrigger = (
    <Button className="flex items-center gap-2">
      <UserPlus className="h-4 w-4" />
      Nuevo Cliente
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                placeholder="Ej: Juan"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido *</Label>
              <Input
                id="apellido"
                value={formData.apellido}
                onChange={(e) => handleInputChange("apellido", e.target.value)}
                placeholder="Ej: Pérez"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="juan.perez@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                value={formData.telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
                placeholder="11-1234-5678"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dni">DNI *</Label>
              <Input
                id="dni"
                value={formData.dni}
                onChange={(e) => handleInputChange("dni", e.target.value)}
                placeholder="12345678"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plan">Plan *</Label>
              <Select value={formData.plan} onValueChange={(value) => handleInputChange("plan", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basico">Básico - $100/mes</SelectItem>
                  <SelectItem value="premium">Premium - $150/mes</SelectItem>
                  <SelectItem value="full">Full Access - $200/mes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observaciones">Observaciones</Label>
            <Textarea
              id="observaciones"
              value={formData.observaciones}
              onChange={(e) => handleInputChange("observaciones", e.target.value)}
              placeholder="Información adicional sobre el cliente..."
              rows={3}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Agregar Cliente
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
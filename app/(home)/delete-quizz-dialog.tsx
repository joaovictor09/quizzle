import { redirect } from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { DeleteQuizzButton } from './delete-quizz-button'

interface DeleteQuizzDialogProps {
  open?: boolean
  quizzId?: string
}

export function DeleteQuizzDialog({ open, quizzId }: DeleteQuizzDialogProps) {
  async function onOpenChange() {
    'use server'

    if (open) {
      redirect('/')
    }
  }

  return (
    <Dialog open={open && Boolean(quizzId)} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this quizz from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DeleteQuizzButton quizzId={quizzId ?? ''} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

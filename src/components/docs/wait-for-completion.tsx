import { Alert } from '@/components/docs/alert'


export const WaitForCompletion = () => {
  return (
    <>
      <Alert type="tip">
        We are working hard to complete this documentation. Thank you for your patience.
      </Alert>

      <img src="/images/wait-for-completion.png" width={620} alt='Wait for completion'/>
    </>
  )
}
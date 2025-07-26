import { Skeleton } from '@heroui/skeleton'

function TaskItemSkeleton() {
  return (
    <li>
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <div className='flex gap-2 items-center w-34'>
            <Skeleton className='rounded-lg w-max'>
              <div className='h-7 w-8'></div>
            </Skeleton>
            <Skeleton className='rounded-lg'>
              <div className='h-7 w-28'></div>
            </Skeleton>
          </div>
          <Skeleton className='rounded-lg'>
            <div className='h-5 w-42'></div>
          </Skeleton>
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-2'>
            <Skeleton className='rounded-lg'>
              <div className='h-6 w-22'></div>
            </Skeleton>
          </div>
        </div>
      </div>
    </li>
  )
}

export default TaskItemSkeleton
